import React, {useState} from "react"
import { View, Text, StyleSheet, TextInput, Switch, TouchableOpacity, Share, Touchable } from "react-native"
import Clipboard from '@react-native-clipboard/clipboard';
// Form Validation using Yup
import * as Yup from 'yup'



const PasswordGenerator = () => {

        const passwordSchema = Yup.object().shape({
        passwordLength: Yup.number()
        .min(4,'Should be minimum of 4 characters')
        .max(16,'Should be maximum of 16 characters')
        .required('Length is required')
    })

    const [password, setPassword] = useState('')
    const [passLength, setPassLength] = useState('4');
    const [isPasswordGenerated, setIsPasswordGenerated] = useState(false)
    const [lowercase, setLowercase] = useState(true)
    const [uppercase, setUppercase] = useState(false)
    const [number, setNumber] = useState(false)
    const [symbols, setSymbols] = useState(false)
    const [error, setError] = useState('')

    const validateLength = async(len : Number) => {
        try {
            await passwordSchema.validate({passwordLength : len})
            setError('')
        } catch (err:any) {
            setError(err.message)
        }
    }

    const generatePassword = (passwordLength: number) => {
    const lowerChar = 'abcdefghijklmnopqrstuvwxyz'
    const upperChar = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const numChar = '0123456789'
    const symbolChar = '!@#$%&_'

    let characterString = ''

    if(lowercase) characterString += lowerChar;
    if(uppercase) characterString += upperChar;
    if(number) characterString += numChar;
    if(symbols) characterString += symbolChar;

    let passwordResult = createPassword(characterString, passwordLength)
    setPassword(passwordResult);
    }

    const createPassword = (characters: string, passwordLength : number) => {
    if(characters.length<=0) setIsPasswordGenerated(false);
    let result = '';
    for(let i=0;i<passwordLength ;i++)
    {
        let charIndex = Math.floor(Math.random()*characters.length);
        result += characters.charAt(charIndex);
    }
    if(characters.length >0 && result.length >0 )
        setIsPasswordGenerated(true);
    return result ; 
    }

    const resetPassword = () => {
    setPassword('');
    setPassLength('');
    setIsPasswordGenerated(false);
    setLowercase(true);
    setUppercase(false);
    setNumber(false);
    setSymbols(false);

    }



    return(
        <View>
            <Text style={styles.heading}>Password Generator</Text>
            <View style= {styles.pass_len_container}>
                <View style={styles.input_container}>
                    <Text style={styles.input_text}>Password Length </Text>
                    <TextInput 
                        placeholder="Ex. 8"
                        style = {styles.inputNum}
                        keyboardType="numeric"
                        value={passLength}
                        onChangeText={(num ) => {
                            const value = Number(num)
                            setPassLength(value.toString())
                            validateLength(value)
                        }}
                    />
                </View>
                {error ? <Text style={styles.error_text}>{error} </Text> : null}
            </View>
            <View style={styles.switch_container}>
                <Text style={styles.switch_text}>Include Lowercase letters</Text>
                <Switch value={lowercase} onValueChange={setLowercase} />
            </View>
            <View style={styles.switch_container}>
                <Text style={styles.switch_text}>Include UpperCase letters</Text>
                <Switch value={uppercase} onValueChange={setUppercase} />
            </View>
            <View style={styles.switch_container}>
                <Text style={styles.switch_text}>Include Numbers</Text>
                <Switch value={number} onValueChange={setNumber} />
            </View>
            <View style={styles.switch_container}>
                <Text style={styles.switch_text}>Include Symbols</Text>
                <Switch value={symbols} onValueChange={setSymbols} />
            </View>
            
                    <View style={styles.touchable_container}>
                            <TouchableOpacity 
                            style={styles.touchable_button1}
                            onPress={()=>generatePassword(Number(passLength))}
                            >
                                <Text style={styles.touchable_text1}>Generate</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                            style={styles.touchable_button2}
                            onPress={resetPassword}
                            >
                                <Text style={styles.touchable_text2}>Reset</Text>
                            </TouchableOpacity>
                    </View>

              

                <TouchableOpacity 
                    style={styles.generated_pass_container}
                    delayLongPress={200}
                    onLongPress={ async() => {
                        if(!password) return ;

                        Clipboard.setString(password);
                        try {
                            await Share.share({message: password});
                            
                        } catch (error) {
                            console.log('Error on sharing: ',error)
                        }
                    } }
                >
                    <Text style={styles.generated_pass_text}>{password}</Text>
                </TouchableOpacity>

            
                
            
            
        </View>
    )
}

const styles = StyleSheet.create({
    heading: {
        fontSize: 30,
        color: '#ffff',
        marginTop:20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    pass_len_container: {
        marginBottom: 20,
        marginTop: 30
    },
    input_container: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 20,
        marginLeft: 15,
    },
    input_text: {
        fontSize:20,
        color: '#ffff'
    },
    inputNum: {
        borderWidth: 1,
        borderColor: '#ffff',
        color:'#ffff',
        height: 50,
        width: 80,
        marginLeft: 100
    },
    error_text: {
        color: '#ff5757ff',
        fontSize: 15,
        marginLeft: 15,
        marginTop: -20,
    },
    switch_container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    switch_text: {
        color: '#ffff',
        fontSize: 20,
        marginLeft: 15,
        marginVertical: 10,
    },
    switch_switch: {

    },
    touchable_container: {
        flex:1,
        flexDirection : 'row',
        justifyContent: 'space-evenly',
        marginVertical: 30
    },
    touchable_button1: {
        borderWidth: 1,
        borderRadius: 30,
        backgroundColor: '#6dc2ffff',
        justifyContent: 'center',
        height: 50,
        width: 140,
    },
    touchable_text1:{
        color: '#ffff',
        fontSize: 20,
        textAlign: 'center'
    },
    touchable_button2: {
        borderWidth: 1,
        borderRadius: 30,
        backgroundColor: '#d9dadbff',
        justifyContent: 'center',
        height: 50,
        width: 140,
    },
    touchable_text2: {
        color: '#ffff',
        fontSize: 20,
        textAlign: 'center'
    },
    generated_pass_container:{
        borderWidth: 2,
        borderColor: '#a8a8a8ff',
        height: 50,
        width: 320,
        marginHorizontal: 20,
        justifyContent: 'center'
    },
    generated_pass_text: {
        color: '#ffff',
        textAlign: 'center',
        fontSize: 20
    },


})

export default PasswordGenerator;
import {StyleSheet} from  'react-native'

interface StylesProps{
    [key: string] : object
}

export const styles:StylesProps = StyleSheet.create({
    container:{
        flex:1,
        width:'100%',
        
    },
    header:{
        width:'100%',
        height:100,
        backgroundColor:"#0084ff",
        justifyContent:'flex-end',
        alignItems:'center'
    },
    TitleView:{
        height:75,
        width:'95%',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
    },
    HeaderTitle:{
        color:'#fff',
        fontSize:22,
        fontFamily:"Roboto-Bold",
    },
    Search:{
        position:'absolute',
        right:5
    },
    TempComtainer:{
        width:'95%',
        height:200,
        backgroundColor:'#0273dc',
        borderRadius:5,
        alignSelf:'center',
        padding:15,
        elevation:10
    },
    Temperatura:{
        color:'#fff',
        fontFamily:'Roboto-Bold',
        fontSize:65
        
    },
    regiao:{
        color:'#fff',
        fontFamily:'Roboto-Bold',
        marginTop:8
    },
    descricao:{
        position:'absolute',
        bottom:10, 
        fontSize:17,
        color:'#fff',
        fontFamily:'Roboto-Bold',
        alignSelf:'center'
    }
})
import { StyleSheet } from "react-native";

const DashBStyle = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#F5F5F5',
        padding: 16,
        position:'absolute',
        width:"100%",
      
    },
    header:{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerText:{
        fontSize: 16,
        color:"#0F67B1",
        fontWeight: 'bold',
        position:"absolute",
        right:10
    },
    iconContainer:{
        flexDirection: 'row',
        alignItems: 'center',
    },
  
    profileIcon:{
        marginLeft: 10,
    },
    searchBar: {
        height: 40,
        backgroundColor: '#FFF',
        borderRadius: 10,
        paddingHorizontal: 16,
        marginBottom: 20,
      },
     
    buttonContainer:{
        width: '80%',
        marginVertical: 10,
        position:'relative',
        left:50,
        
    },
    cardContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems:"center",
        marginBottom: 10,
        width:"100%",
        backgroundColor:"#379777",
        borderRadius:20,
        marginTop:20,
        paddingVertical:20
      },
      card: {
        
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 16,
        width: '80%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        margin:20
      },
      cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      cardContent: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      avatar: {
        marginRight: 5,
      },
      addIcon: {
        marginLeft: 5,
      },
      cardImageContainer: {
        
        flexDirection: 'row',
        alignItems: 'center',
      },
      cardImage: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 5,
      },

})

export default DashBStyle
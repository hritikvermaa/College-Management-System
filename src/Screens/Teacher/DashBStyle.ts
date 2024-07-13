import { StyleSheet } from 'react-native';

const DashBStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  iconContainer: {
    flexDirection: 'row',
  },
  profileIcon: {
    marginLeft: 10,
  },
  searchBar: {
    marginBottom: 20,
  },
  userDetailsContainer: {
    marginBottom: 20,
  },
  userDetailsText: {
    fontSize: 16,
    marginBottom: 5,
  },
  cardContainer: {
    marginBottom: 20,
  },
  scrollview: {
    flexDirection: 'row',
  },
  card: {
    width: 300,
    padding: 10,
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  cardTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  cardImageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  cardImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logoutButtonContainer: {
    margin: 16,
    alignItems: 'center',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff3b30',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  logoutButtonText: {
    marginLeft: 8,
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  userDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap:10
  },
});

export default DashBStyle;

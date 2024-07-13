import { StyleSheet } from 'react-native';

const DashBStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color:'#000'
  },
  iconContainer: {
    flexDirection: 'row',
  },
  profileIcon: {
    marginLeft: 16,
  },
  card: {
    margin: 16,
  },
  userDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  userDetailsText: {
    marginLeft: 8,
    fontSize: 16,
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
});

export default DashBStyle;

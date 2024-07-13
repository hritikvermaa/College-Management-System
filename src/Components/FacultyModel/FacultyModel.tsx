import React from 'react';
import { StyleSheet, View, Text, Image, Modal, Button } from 'react-native';

interface FacultyModalProps {
    faculty: {
        name: string;
        department: string;
        designation: string;
        phone: string;
        email: string;
        profile_image: string;
    };
    onClose: () => void;
}

const FacultyModal: React.FC<FacultyModalProps> = ({ faculty, onClose }) => {
    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={true}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <Image source={{ uri: "data:image/jpeg;base64,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"}} style={styles.profileImageLarge} />
                <Text style={styles.name}>{faculty.name}</Text>
                <Text style={styles.designation}>{faculty.designation}</Text>
                <Text style={styles.department}>{faculty.department}</Text>
                <Text style={styles.phone}>{faculty.phone}</Text>
                <Text style={styles.email}>{faculty.email}</Text>
                <Button title="Close" onPress={onClose} />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
        gap:3
    },
    profileImageLarge: {
        width: 200,
        height: 200,
        borderRadius: 100,
        marginBottom: 20
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    designation: {
        fontSize: 14,
        color: '#555'
    },
    department: {
        fontSize: 14,
        color: '#888'
    },
    phone: {
        fontSize: 14,
        color: '#555'
    },
    email: {
        fontSize: 14,
        color: '#555'
    }
});

export default FacultyModal;

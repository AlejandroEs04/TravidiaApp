import { Colors } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';
import { FontAwesome } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { ThemedText } from './ThemedText';

type InputFile = {
    selectedDocuments: DocumentPicker.DocumentPickerAsset[], 
    setSelectedDocuments: React.Dispatch<React.SetStateAction<DocumentPicker.DocumentPickerAsset[]>>
    label: string
}

export default function InputFile({ selectedDocuments, setSelectedDocuments, label } : InputFile) {
    const backgroundColor = useThemeColor({ light: Colors.light.container, dark: Colors.dark.container }, 'background')
    
    const pickDocuments = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
            multiple: true, // Allows the user to select any file 
            });

            if (!result.canceled) {
            const successResult = result as DocumentPicker.DocumentPickerSuccessResult;

            if (selectedDocuments.length + successResult.assets.length <= 5) {
                setSelectedDocuments((prevSelectedDocuments) => [
                    ...prevSelectedDocuments,
                    ...successResult.assets,
                ]);
            } else {
                console.log("Maximum of 5 documents allowed.");
            }
            } else {
            console.log("Document selection cancelled.");
            }
        } catch (error) {
            console.log("Error picking documents:", error);
        }
    };

    const getFileType = (fileName: string): string => {
    const extension = fileName.split('.').pop()?.toLowerCase();
        switch (extension) {
            case 'pdf':
                return 'PDF';
            case 'doc':
            case 'docx':
                return 'Word';
            case 'xls':
            case 'xlsx':
                return 'Excel';
            default:
                return 'Unknown';
        }
    };

    const removeDocument = (index: number) => {
        setSelectedDocuments((prevSelectedDocuments) =>
            prevSelectedDocuments.filter((_, i) => i !== index)
        );
    };

    return (
        <View>
            {label && (
                <ThemedText style={styles.label}>{label}</ThemedText>
            )}
            <ThemedText onPress={pickDocuments} style={[styles.button, {backgroundColor}]}>
                Pick Documents
            </ThemedText>
            {selectedDocuments.map((doc, index) => (
                <View key={doc.uri} style={[styles.file, { backgroundColor }]}>
                    <ThemedText>{doc.name} ({getFileType(doc.name)})</ThemedText>
                    <Pressable onPress={() => removeDocument(index)}>
                        <FontAwesome name="trash" size={28} color="red" />
                    </Pressable>
                </View>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        fontSize: 20, 
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderWidth: 0,
        borderRadius: 15,
        marginTop: 5,
        color: '#cfcfcfff',
        shadowColor: "#000000",
        shadowOffset: {
        width: 0,
        height: 1,
        },
        shadowOpacity: 0.05,
        shadowRadius: 20,
        elevation: 1,
        fontWeight: '400'
    },
    file: {
        marginTop: 10, 
        borderRadius: 15,
        flexDirection: 'row', 
        justifyContent: 'space-between',  
        alignItems: 'center',
        paddingHorizontal: 15, 
        paddingVertical: 10,
        shadowColor: "#000000",
        shadowOffset: {
        width: 0,
        height: 1,
        },
        shadowOpacity: 0.05,
        shadowRadius: 20,
        elevation: 1,
    },
    label: {
        fontSize: 24,
        fontWeight: '800'
    }
})
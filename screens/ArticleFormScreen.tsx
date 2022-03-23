import React, {useEffect, useState} from 'react'
import {NavigationProps, ScreenProps} from '../types/screens'
import {Button, Dimensions, ScrollView, StyleSheet, View} from 'react-native'
import {screenStyles} from '../styles/common'
import {useDispatch} from 'react-redux'
import {useNavigation} from '@react-navigation/native'
import {createArticle, editArticle} from '../store/articles/articles-thunks'
import {IFile} from '../types/entities'
import * as DocumentPicker from 'expo-document-picker'
import * as Yup from 'yup'
import {Formik} from 'formik'
import FormikField from '../components/common/FormikField'
import Files from '../components/common/Files'

const validationSchema = Yup.object().shape({
    title: Yup.string()
        .max(255, 'Слишком длинное')
        .required('Поле обязательно для заполнения'),

    text: Yup.string()
        .required('Поле обязательно для заполнения')
})

const ArticleFormScreen: React.FC<ScreenProps<'ArticleForm'>> = (props) => {
    const year = props.route.params.year
    const subjectId = props.route.params.subjectId
    const specialityId = props.route.params.specialityId
    const editedArticle = props.route.params.editedArticle

    const dispatch = useDispatch()
    const navigation = useNavigation<NavigationProps>()

    const [files, setFiles] = useState<IFile[]>([])

    useEffect(() => {
        if (editedArticle) {
            setFiles(editedArticle.files)

            navigation.setOptions({
                title: 'Редактирование записи'
            })
        }
    }, [editedArticle])

    const pickFile = async () => {
        const file = await DocumentPicker.getDocumentAsync()

        if (file.type === 'success') {
            setFiles([...files, {
                file: file.uri,
                fileName: file.name,
                fileType: file.mimeType,
                fileSize: file.size,
                fileData: file.file,
            }])
        }
    }

    const create = (values: { title: string, text: string }) => {
        if (subjectId && year && specialityId) {
            dispatch(createArticle(values.title, values.text, subjectId, year, specialityId, files))

            navigation.goBack()
        }
    }

    const edit = (values: { title: string, text: string }) => {
        if (editedArticle) {
            dispatch(editArticle(editedArticle.id, values.title, values.text, files))
            navigation.goBack()
        }
    }

    const removeFile = (file: IFile) => {
        setFiles(files.filter(item => item !== file))
    }

    return <View style={screenStyles.container}>
        <Formik
            initialValues={{
                text: editedArticle?.text || '',
                title: editedArticle?.title || '',
            }}
            onSubmit={editedArticle ? edit : create}
            validationSchema={validationSchema}
        >
            {(formik) => <View style={styles.innerContainer}>
                <ScrollView>
                    <View style={styles.inputContainer}>
                        <FormikField
                            value={formik.values.title}
                            onChangeText={formik.handleChange('title')}
                            placeholder={'Название'}
                            error={formik.touched.title ? formik.errors.title : undefined}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <FormikField
                            value={formik.values.text}
                            onChangeText={formik.handleChange('text')}
                            placeholder={'Текст'}
                            error={formik.touched.text ? formik.errors.text : undefined}
                            multiline={true}
                            numberOfLines={10}
                            style={styles.textarea}
                        />
                    </View>

                    <View style={styles.filesContainer}>
                        <Files
                            files={files}
                            onDelete={removeFile}
                        />
                    </View>
                </ScrollView>

                <View style={styles.buttonsContainer}>
                    <Button title={'Добавить файл'} onPress={pickFile} disabled={formik.isSubmitting}/>
                    <Button title={'Сохранить'} onPress={formik.submitForm} disabled={formik.isSubmitting}/>
                </View>
            </View>}
        </Formik>
    </View>
}

const styles = StyleSheet.create({
    innerContainer: {
        flex: 1,
        justifyContent: 'space-between',
        height: '100%',
        padding: 5,
    },

    filesContainer: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
    },

    inputContainer: {
        marginVertical: 5,
    },

    textarea: {
        textAlignVertical: 'top',
        paddingVertical: 5,
    },

    fileItem: {
        width: '33.33%',
        height: Dimensions.get('window').width / 3,
        padding: 2,
    },

    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    }
})

export default ArticleFormScreen
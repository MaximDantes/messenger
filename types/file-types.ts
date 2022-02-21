export type FileType = 'unknown' | 'IMG' | 'image/jpeg'| 'image/png' | 'pdf' | 'docx' | 'article' | string

export const isFileTypeImage = (fileType: string | undefined | FileType) => {
    return fileType === 'image/png' || fileType === 'image/jpeg' || fileType === 'IMG'
}

export const isFileTypeOpenable = (fileType: string | undefined | FileType) => {
    return fileType === 'pdf' || fileType === 'docx'
}

export const getFileType = (fileName: string): FileType => {
    const extension = fileName.split('.').pop()

    switch (extension) {
        case 'png':
            return 'image/png'

        case 'jpg':
            return 'image/jpeg'

        case 'jpeg':
            return 'image/jpeg'

        case 'pdf':
            return 'pdf'

        case 'docx':
            return 'docx'

        default:
            return 'unknown'
    }
}

export const getFileName = (uri: string): string => {
    return uri.split('/').pop() || ''
}
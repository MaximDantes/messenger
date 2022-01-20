export type FileType = 'unknown' | 'image/jpeg'| 'image/png' | string

export const isFileImage = (fileType: string | undefined) => {
    return fileType === 'image/png' || fileType === 'image/jpeg'
}
import AlertModal from '@/app/components/modal/alert-modal'
import PostEditorModal from '@/app/components/modal/post-editor-modal'
import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { Toaster } from 'sonner'

export default function ModalProvider({ children }: { children: ReactNode }) {
    return (
        <>
            {createPortal(<PostEditorModal />, document.getElementById('modal-root')!)}
            {createPortal(<AlertModal />, document.getElementById('modal-root')!)}
            <Toaster />
            {children}
        </>
    )
}

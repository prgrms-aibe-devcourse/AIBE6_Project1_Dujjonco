import { useAlertModal } from '@/store/alert-modal'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '../ui/alert-dialog'

export default function AlertModal() {
    const store = useAlertModal()
    if (!store.isOpen) return null

    const handleCancelClick = () => {
        if (store.onNegative) store.onNegative()
        store.actions.close()
    }

    const handleActionClick = () => {
        if (store.onPositive) store.onPositive()
        store.actions.close()
    }

    return (
        <AlertDialog open={store.isOpen}>
            <AlertDialogContent size="sm" className="text-center">
                <AlertDialogHeader className="items-center">
                    <AlertDialogTitle>{store.title}</AlertDialogTitle>
                    <AlertDialogDescription>{store.description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="!flex !flex-col !items-center gap-2">
                    <AlertDialogAction onClick={handleActionClick} className="w-full">
                        확인
                    </AlertDialogAction>
                    <AlertDialogCancel onClick={handleCancelClick} className="w-full">
                        취소
                    </AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

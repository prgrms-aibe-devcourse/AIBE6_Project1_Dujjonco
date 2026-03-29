import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '@/app/ui2/popover'
import type { Theme } from '@/types'
import { SunIcon } from 'lucide-react'

const THEMES: Theme[] = ['system', 'dark', 'light']

export default function ThemeButton() {
    const onChangeTheme = (theme: Theme) => {
        const htmlTag = document.documentElement
        htmlTag.classList.remove('dark', 'light')
        localStorage.setItem('theme', theme) // ✅ 추가

        if (theme === 'system') {
            const isDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches // ✅ 오타 수정
            htmlTag.classList.add(isDarkTheme ? 'dark' : 'light')
        } else {
            htmlTag.classList.add(theme) // ✅ 중복 제거
        }
    }

    return (
        <Popover>
            <PopoverTrigger>
                <div className="hover:bg-muted cursor-pointer rounded-full p-2">
                    <SunIcon />
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-35 p-0">
                {THEMES.map((theme) => (
                    <PopoverClose key={`theme-button-${theme}`} asChild>
                        <div onClick={() => onChangeTheme(theme)} className="hover:bg-muted cursor-pointer p-3">
                            {theme}
                        </div>
                    </PopoverClose>
                ))}
            </PopoverContent>
        </Popover>
    )
}

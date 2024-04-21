import {
    validateEmail,
    validateFirstname,
    validatePhoneNumber
} from '@/util/server'
import { validateContactName } from '@/util/util'

export function nameErrors(name: any): string | false {
    if (!name) return 'Please fill in this input.'

    if (!validateFirstname(name as string)) return 'Please enter a valid name.'

    return false
}

export async function emailErrors(email: any): Promise<string | false> {
    if (!email) return 'Please fill in this input.'
    if (!(await validateEmail(email as string)))
        return 'Please enter a valid email address.'
    return false
}

export function phoneErrors(phone: any): string | false {
    if (typeof phone !== 'string') {
        return 'Please enter a valid phone number'
    }

    if (!validatePhoneNumber(phone)) {
        return 'Please enter a valid phone number'
    }
    return false
}

export function companyErrors(name: any): string | false {
    if (typeof name !== 'string') {
        return 'Please enter a valid name'
    }
    if (!validateContactName(name)) {
        return 'Please enter a valid name'
    }
    return false
}

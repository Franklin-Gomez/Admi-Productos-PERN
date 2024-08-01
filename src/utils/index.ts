export function formatCurrency ( amount : number ) { 
    return new Intl.NumberFormat('en-us', { 
        style : 'currency',
        currency : 'USD'
    }).format(amount)
}

export function toBoolean ( str : string ) { 
    return str.toLocaleLowerCase() === 'true'
}
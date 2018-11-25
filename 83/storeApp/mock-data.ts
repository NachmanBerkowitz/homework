interface Category {
    category: string;
}

export interface Item {
    price: string;
    name: string;
    discription: string;
}

export interface Department {
    department: Category;
    items: Item[];
}

export const mockData: Department[] = [
    {
        department: { category: 'shoes' },
        items: [{ price: '$3.33', name: 'nike xl', discription: 'really good' },
                {price: '$9.33', name: 'nike xsl', discription: 'really great'}],
    },
    {
        department: { category: 'pants' },
        items: [{ price: '$3.33', name: 'slacks', discription: 'they\'re ok' },
                {price: '$9.33', name: 'shorts', discription: 'terrible'}], 
    }
];

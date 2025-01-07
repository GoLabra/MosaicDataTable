
import { useCallback, useEffect, useMemo, useState } from "react";
import { ContentManagerSearchState } from "../types/types";

interface UseContentManagerStoreParams {
    searchState: ContentManagerSearchState;
}
export const useContentManagerStore = (params: UseContentManagerStoreParams) => {

    const { searchState } = params;

    const [state, setState] = useState<any[]>(initialItems)
    const [loading, setLoading] = useState(false);

    const totalCount = initialItems.length;

    // simulate API loading
    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, [searchState]);

    const sortedData = useMemo(() => {
        if (!params.searchState.sortBy) {
            return state;
        }

        return [...state].sort((a: any, b: any) => {
            const aValue = a[params.searchState.sortBy!];
            const bValue = b[params.searchState.sortBy!];
            
            if (searchState.order === 'asc') {
                return aValue > bValue ? 1 : -1;
            }
            return aValue < bValue ? 1 : -1;
        });
    }, [loading]);

    const paginatedData = useMemo(() => {
        const startIndex = (searchState.page - 1) * searchState.rowsPerPage;
        const endIndex = startIndex + searchState.rowsPerPage;
        return sortedData.slice(startIndex, endIndex);
    }, [loading]);

    const numberOfPages = useMemo(() => {
        return Math.ceil(totalCount / searchState.rowsPerPage);
    }, [totalCount, searchState.rowsPerPage]);

    return useMemo(() => ({
        state: {
            data: paginatedData,
            dataLoading: loading,
            pagesCount: numberOfPages,
            totalItems: totalCount
        }
    }), [loading, paginatedData, numberOfPages, totalCount]);
}


const initialItems = [{
    id: 1,
    name: 'Max Mustermann',
    email: 'max.mustermann@mail.com',
    rating: 3.5,
    age: 30,
    gender: 'male',
    phone: '+1 (123) 456-7890',
    address: 'Vienna, Austria',
    progress: 100,
    verified: false,
    registrationDate: new Date(2019, 1, 1),
    status: 'Active',
    role: 'Admin',
    country: 'Austria',
    countryCode: 'at',
    city: 'Vienna',
    language: 'German',
}, {
    id: 2,
    name: 'John Doe',
    email: 'juan.perez@mail.com',
    rating: 4.5,
    age: 25,
    gender: 'female',
    phone: '+1 (456) 456-7890',
    address: 'Washington DC, USA',
    progress: 100,
    verified: true,
    registrationDate: new Date(2022, 1, 1),
    status: 'Active',
    role: 'Admin',
    country: 'USA',
    countryCode: 'us',
    city: 'Washington DC',
    language: 'English',

}, {
    id: 3,
    name: 'Juan Pérez',
    email: 'juan.perez@mail.com',
    rating: 2,
    age: 22,
    gender: 'male',
    phone: '+1 (789) 456-7890',
    address: 'Madrid, Spain',
    progress: 50,
    verified: true,
    registrationDate: new Date(2021, 1, 1),
    status: 'Inactive',
    role: 'User',
    country: 'Spain',
    countryCode: 'es',
    city: 'Madrid',
    language: 'Spanish',
}, {
    id: 4,
    name: 'Mario Rossi',
    email: 'mario.rossi@mail.com',
    rating: 0,
    age: 22,
    gender: 'male',
    phone: '+1 (101) 456-7890',
    address: '123 Main St, Anytown, USA',
    progress: 25,
    verified: true,
    registrationDate: new Date(2021, 1, 1),
    status: 'Inactive',
    role: 'User',
    country: 'Italy',
    countryCode: 'it',
    city: 'Rome',
    language: 'Italian',
}, {
    id: 5,
    name: 'Andrei Vinca',
    email: 'andrei.vinca@outlook.com',
    rating: 1.5,
    age: 37,
    gender: 'male',
    phone: '+1 (112) 456-7890',
    progress: 10,
    address: 'Cluj-Napoca, Romania',
    verified: true,
    registrationDate: new Date(2021, 1, 1),
    status: 'Inactive',
    role: 'User',
    country: 'Romania',
    countryCode: 'ro',
    city: 'Bucharest',
    language: 'Romanian',
}, {
    id: 6,
    name: 'Jean Dupont',
    email: 'jean.dupont@mail.com',
    rating: 5,
    age: 22,
    gender: 'male',
    phone: '+1 (131) 456-7890',
    address: 'Paris, France',
    progress: 12,
    verified: true,
    registrationDate: new Date(2021, 1, 1),
    status: 'Inactive',
    role: 'User',
    country: 'France',
    countryCode: 'fr',
    city: 'Paris',
    language: 'French',
}, {
    id: 7,
    name: 'Nino Kalandadze',
    email: 'giorgi.beridze@mail.com',
    rating: 2.5,
    age: 17,
    gender: 'female',
    phone: '+1 (131) 456-7890',
    address: 'Tbilisi, Georgia',
    progress: 12,
    verified: true,
    registrationDate: new Date(2017, 10, 1),
    status: 'Active',
    role: 'Admin',
    country: 'Georgia',
    countryCode: null,
    city: 'Tbilisi',
    language: 'Georgian',
},{
    id: 8,
    name: 'Andreas Georgiou',
    email: 'andreas.georgiou@mail.com',
    rating: 3.5,
    age: 18,
    gender: 'male',
    phone: '+1 (131) 456-7890',
    address: 'Nicosia, Cyprus',
    progress: 12,
    verified: true,
    registrationDate: new Date(2018, 3, 1),
    status: 'Inactive',
    role: 'User',
    country: 'Cyprus',
    countryCode: null,
    city: 'Nicosia',
    language: 'Greek',
},{
    id: 9,
    name: 'João da Silva',
    email: 'giorgi.beridze@mail.com',
    rating: 1.5,
    age: 17,
    gender: 'male',
    phone: '+1 (131) 456-7890',
    address: 'Rio de Janeiro, Brazil',
    progress: 21,
    verified: true,
    registrationDate: new Date(2017, 10, 1),
    status: 'Active',
    role: 'User',
    country: 'Brazil',
    countryCode: null,
    city: 'Rio de Janeiro',
    language: 'Portuguese',
}, {
    id: 10,
    name: 'Naledi Khumalo',
    email: 'naledi.khumalo@mail.com',
    rating: 1,
    age: 14,
    gender: 'female',
    phone: '+1 (131) 456-7890',
    address: 'Cape Town, South Africa',
    progress: 75,
    verified: true,
    registrationDate: new Date(2017, 10, 1),
    status: 'Active',
    role: 'User',
    country: 'South Africa',
    countryCode: null,
    city: 'Cape Town',
    language: 'Afrikaans',
}, {
    id: 11,
    name: 'Hanako Suzuki',
    email: 'hanako.suzuki@mail.com',
    rating: 2.5,
    age: 17,
    gender: 'male',
    phone: '+1 (131) 456-7890',
    address: 'Tokyo, Japan',
    progress: 12,
    verified: true,
    registrationDate: new Date(2017, 10, 1),
    status: 'Active',
    role: 'User',
    country: 'Japan',
    countryCode: null,
    city: 'Tokyo',
    language: 'Japanese',
}];

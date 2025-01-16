
import { useCallback, useEffect, useMemo, useState } from "react";
import { ContentManagerSearchState } from "../types/types";
import { FilterValue } from "mosaic-data-table";

interface UseContentManagerStoreParams {
    searchState: ContentManagerSearchState;
}
export const useContentManagerStore = (params: UseContentManagerStoreParams) => {

    const { searchState } = params;

    const [state, setState] = useState<any[]>(initialItems)
    const [loading, setLoading] = useState(false);



    // simulate API loading
    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, [searchState]);

    // const filteredData = useMemo(() => {
    //     return state.filter((item: any) => {
    //         return Object.keys(searchState.filter).every((key: string) => {
    //             const value = searchState.filter[key];
    //             return item[key] === value;
    //         });
    //     });
    // }, [loading]);

    const filteredData = useMemo(() => {
        if (!searchState.filter) {
            return state;
        }

        return state.filter((item) => {
            return Object.entries(searchState.filter).every(([key, filter]: [string, FilterValue | any]) => {

                if (!filter.value) {
                    return true; // Skip if operation or value is empty if
                }

                const itemValue = item[key]?.toString().toLowerCase();
                const filterValue = filter.value.toLowerCase();

                switch (filter.operation) {
                    case 'starts-with':
                        return itemValue.startsWith(filterValue);
                    case 'ends-with':
                        return itemValue.endsWith(filterValue);
                    case 'contains':
                        return itemValue.includes(filterValue);
                    case 'equals':
                        return itemValue === filterValue;
                    case 'less-than':
                        return parseFloat(itemValue) < parseFloat(filterValue);
                    case 'less-or-equal-than':
                        return parseFloat(itemValue) <= parseFloat(filterValue);
                    case 'bigger-than':
                        return parseFloat(itemValue) > parseFloat(filterValue);
                    case 'bigger-or-equal-than':
                        return parseFloat(itemValue) >= parseFloat(filterValue);
                    default:
                        return itemValue.includes(filterValue);
                }
            });
        });
    }, [loading]);

    const totalCount = filteredData.length;

    const sortedData = useMemo(() => {
        if (!params.searchState.sortBy) {
            return state;
        }

        return [...filteredData].sort((a: any, b: any) => {
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
    tokens: 100,
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
    tokens: 72,
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
    tokens: 12
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
    tokens: 10,
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
    tokens: 99
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
    tokens: 45
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
    tokens: 92
}, {
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
    tokens: 33
}, {
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
    tokens: 34
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
    tokens: 51
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
    tokens: 86
}];

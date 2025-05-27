import { useEffect, useState, useMemo } from 'react';

export const useForm = (initialForm = {}, formValidations = {} ) => {
    const [ formState, setFormState ] = useState(initialForm);
    const [ formValidation, setFormValidation] = useState({});

    useEffect(() => {
        createValidators();
    }, [formState]);

    const onInputChange = ({ target}) => {
        const {name, value} = target;
        setFormState({
            ...formState,
            [name]: value,
        });
    }

    const onResetForm = () => setFormState(initialForm);

    const isFormValid = useMemo(() => {

        for (const formField of Object.keys(formValidation)) {
            if (formValidation[formField] !== null) return false;
        }

        return true;

    }, [ formValidation ]);

    const createValidators = () => {
        const formCheckedValues = {};
        for (const formField of Object.keys(formValidations)) {
            const [ fn, errorMessage ] = formValidations[formField];

            formCheckedValues[`${formField}Valid`] = fn( formState[formField] ) ? null : errorMessage;
        }
        setFormValidation(formCheckedValues);
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        errors: formValidation,
        isFormValid
    }
} 
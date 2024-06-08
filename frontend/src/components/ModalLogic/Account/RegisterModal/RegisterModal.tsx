import { ChangeEvent, FormEvent, useState } from 'react';
import '../AccountModal.css';
import { register } from '../../../../api/auth/register';

interface Props {
    setCurrent: React.Dispatch<React.SetStateAction<string>>
}


export function RegisterModal({ setCurrent }: Props) {


    // позже заменить на фабрику функций

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [secondPassword, setSecondPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const handleChangeLogin = (event: ChangeEvent<HTMLInputElement>) => {
        setLogin(event.target.value);
    }

    const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const handleChangeSecondPassword = (event: ChangeEvent<HTMLInputElement>) => {
        setSecondPassword(event.target.value);
    }

    const handleChangeFirstName = (event: ChangeEvent<HTMLInputElement>) => {
        setFirstName(event.target.value);
    }

    const handleChangeLastName = (event: ChangeEvent<HTMLInputElement>) => {
        setLastName(event.target.value);
    }

    function clear() {
        setFirstName("");
        setLastName("");
        setPassword("");
        setLogin("");
        setSecondPassword("");
    }

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        event.stopPropagation();
        register(login, password, firstName, lastName);
        clear();
    }



    return (
        <form className="justify-content-center form-auth" onSubmit={handleSubmit}>
            <div>
                <input type="text" placeholder="Логин" value={login} onChange={handleChangeLogin} />
                <br />
                <input type="text" placeholder="Имя" value={firstName} onChange={handleChangeFirstName} />
                <br />
                <input type="text" placeholder="Фамилия" value={lastName} onChange={handleChangeLastName} />
                <br />
                <input type="text" placeholder="Пароль" value={password} onChange={handleChangePassword} />
                <br />
                <input type="text" placeholder="Подтвердите пароль" value={secondPassword} onChange={handleChangeSecondPassword} />
                <br />
                <div>
                    <button className="button-auth">Создать аккаунт</button>
                </div>
                <div>
                    <button className="button-register" onClick={() => setCurrent("auth")}>У меня есть пароль</button>
                </div>
            </div>
        </form>
    )
}
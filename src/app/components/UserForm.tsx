const UserForm: React.FC = () => {

    return(
        <div>
            <label htmlFor='name'>Name:</label>
            <input type='text' id='name' name='name' />
            <label htmlFor='email'>Email:</label>
            <input type='email' id='email' name='email' />
            <label htmlFor='password'>Password:</label>
            <input type='password' id='password' name='password' />
        </div>
    )

}

export default UserForm;
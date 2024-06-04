const UserForm: React.FC = () => {

    return(
        <div className="grid grid-cols-2 space-y-2">
            <label className="" htmlFor='name'>Gender:</label>
            <select className="" id='gender'>
                <option value='Male' >Male </option>
                <option value='Female'>Female </option>
            </select>
            <label htmlFor='Age'>Age:</label>
            <input type='number' id='Age' name='Age' />

        </div>
    )

}

export default UserForm;
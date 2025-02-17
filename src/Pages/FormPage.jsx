import React, { Component } from 'react'
import { Box, TextField, Button, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { addUserDetails, fetchUserDetails } from '../User/service';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

const nameRegex = /^[A-Za-z\s]+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\d{10}$/;
const marksRegex = /^(?:100|[0-9]{1,2})$/;

const validate = (values) => {
    const errors = {};

    if (!values.userName || !nameRegex.test(values.userName)) {
        errors.userName = 'Name must contain only alphabets.';
    }

    if (!values.email || !emailRegex.test(values.email)) {
        errors.email = 'Please enter a valid email address.';
    }

    if (!values.phoneNo || !phoneRegex.test(values.phoneNo)) {
        errors.phoneNo = 'Please enter a valid 10-digit phone number.';
    }

    if (!values.maths || !marksRegex.test(values.maths)) {
        errors.maths = 'Marks must be between 0 and 100.';
    }

    if (!values.physics || !marksRegex.test(values.physics)) {
        errors.physics = 'Marks must be between 0 and 100.';
    }

    if (!values.chemistry || !marksRegex.test(values.chemistry)) {
        errors.chemistry = 'Marks must be between 0 and 100.';
    }

    return errors;
};

class FormPage extends Component {

    constructor(props) {
        super(props);
    }

    renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
        <TextField
            {...input}
            {...custom}
            label={label}
            variant='outlined'
            fullWidth
            error={touched && Boolean(error)}
            helperText={touched && error}
        />
    );

    async componentDidMount() {
        const { id, initialize, fetchUserDetails } = this.props;
        if (id) {
            await fetchUserDetails(id, initialize);
        }
    }

    onSubmit = async (formValues) => {
        const { addUserDetails, navigate } = this.props;
        await addUserDetails(formValues);
        navigate('/');
    };

    render() {
        const { handleSubmit } = this.props;
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '95vh'
                }}
            >
                <Box
                    component="form"
                    onSubmit={handleSubmit(this.onSubmit)}
                    sx={{
                        width: 400,
                        padding: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        border: '1px solid #ccc',
                        borderRadius: 2,
                        boxShadow: 3,
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <Typography variant="h4" align="center" gutterBottom>
                        User Form
                    </Typography>

                    <Field
                        name="name"
                        component={this.renderTextField}
                        label="Name"
                        placeholder="Enter Your Name"
                    />
                    <Field
                        name="email"
                        component={this.renderTextField}
                        label="Email"
                        placeholder="Enter Your Email"
                    />
                    <Field
                        name="phoneNo"
                        component={this.renderTextField}
                        label="Phone Number"
                        placeholder="Enter Your Phone Number"
                    />
                    <Field
                        name="maths"
                        component={this.renderTextField}
                        label="Maths Marks"
                        placeholder="Enter Your Marks"
                        type="number"
                    />
                    <Field
                        name="physics"
                        component={this.renderTextField}
                        label="Physics Marks"
                        placeholder="Enter Your Marks"
                        type="number"
                    />
                    <Field
                        name="chemistry"
                        component={this.renderTextField}
                        label="Chemistry Marks"
                        placeholder="Enter Your Marks"
                        type="number"
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        type="submit"
                        sx={{ mt: 2 }}
                        onClick={this.handleSubmit}
                    >
                        Submit
                    </Button>
                </Box>
            </Box>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        id: ownProps.id,
        userData: state.users.users,
    }
};

const mapDispatchToProps = (dispatch) => ({
    fetchUserDetails: (id, initialize) => fetchUserDetails(dispatch, '', id, null, '', initialize),
    addUserDetails: (user) => addUserDetails(user),
});


const ReduxFormPage = reduxForm({
    form: 'userForm',
    validate
})(FormPage);

const FormPageWrapper = (props) => {
    const { id } = useParams();
    const navigate = useNavigate();
    return <ReduxFormPage {...props} id={id} navigate={navigate} />;
}

export default connect(mapStateToProps, mapDispatchToProps)(FormPageWrapper);


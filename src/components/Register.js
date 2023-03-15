import { React, useRef, useState, useEffect } from 'react'
// import { Link, useNavigate } from "react-router-dom";
import '../style/register.css'
import { strengthColor, strengthIndicator } from '../utilities-design/password-strength';
import DisplayPicture from '../utilities-design/DisplayPicture.js'
import {
    Box,
    FormControl,
    Grid,
    IconButton,
    Typography,
} from '@mui/material';
import { Form, FormGroup, Label, Input, Button, Row, InputGroup, InputGroupText } from 'reactstrap';
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { DatePicker } from 'antd';


const initialStates = {
    name: '',
    id: '',
    email: '',
    adhaar: '',
    mobile: '',
    password: '',
    address: '',
    bday: '',
    picture: null,
}

export default function Register({ registerFor }) {
    const imgRef = useRef(null)
    const [genderr, setGender] = useState('')
    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues: initialStates,
        validationSchema:
            Yup.object().shape({
                name: Yup.string().min(2).max(25).required('Name is required'),
                id: Yup.string().min(5).max(255).required('ID is required'),
                email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                adhaar: Yup.number().test('len', 'must be 12 digits', val => val.toString().length === 12).required('adhaar number is required'),
                mobile: Yup.number().test('len', 'enter valid number', val => val.toString().length === 10).required('mobile number is required'),
                password: Yup.string().min(5, 'use least 5 characters').max(255).required('Password is required'),
                address: Yup.string().max(255).required('address is required'),
                bday: Yup.string().max(255).required('Birth date is required'),

            })
        ,
        onSubmit: async (vals) => {
            console.log('vals :>> ', vals);
            const { name, id, bday, email, adhaar, password, mobile, address } = vals;
            const gender = genderr;
            const registerfor = registerFor;

            console.log('gender :>> ', gender);
            console.log('registerfor :>> ', registerfor);
            const res = await fetch("http://localhost:7100/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, id, bday, email, adhaar, password, mobile, gender, address, registerfor })
            })
            const data = await res.json();
            console.log('data :>> ', data);
            if (data.err) {
                window.alert("invalid registration : " + data.err)
            }
            else if (data.success) {
                window.alert(registerFor + " registration successful")
                // history.push('/login')
            }
            alert(vals)
        }
    })
    console.log('errors :>> ', errors);
    // console.log('errors :>> ', errors.length);
    const [level, setLevel] = useState();
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const changePassword = (value) => {
        const temp = strengthIndicator(value);
        setLevel(strengthColor(temp));
    };

    // const navigate = useNavigate();

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const url = "http://localhost:8080/api/users";
    //         const { data: res } = await axios.post(url, data);
    //         navigate("/login");
    //         console.log(res.message);
    //     } catch (error) {
    //         if (
    //             error.response &&
    //             error.response.status >= 400 &&
    //             error.response.status <= 500
    //         ) {
    //             setError(error.response.data.message);
    //         }
    //     }
    // };

    return (
        <>
            {/* <Dashboard /> */}

            <div className="container">

                <h3 align="center">Register new {registerFor === 'Police' ? 'Police 👮' : 'Admin 👤'}</h3>
                <br />

                <Form onSubmit={handleSubmit}>

                    <FormGroup className='profileContainer'>
                        <input ref={imgRef} hidden size='sm' type="file" name='picture' id='picture' onChange={(e) => { setFieldValue("picture", e.target.files[0]) }} />
                        {values?.picture ? <DisplayPicture file={values?.picture} /> : <img className='profilePic' src='https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-default-avatar-profile-icon-vector-social-media-user-image-vector-illustration-227787227.jpg' alt="profile img" />}
                        <button className='profileBtn' onClick={(e) => { e.preventDefault(); imgRef.current.click() }}>Profile Picture</button>
                        {/* <Label for="exampleSelect"> <b>Profile Picture</b>  </Label> */}
                        {errors.picture && touched.picture ? <p className='form-error' >{errors.picture}</p> : null}

                    </FormGroup>
                    <FormGroup>
                        <Label for="Name"><b>Name</b></Label>
                        <Input invalid={errors.name && touched.name} valid={!errors.name && touched.name} placeholder="name..." type="text" name='name' id='name' size='sm' value={values.name} onChange={handleChange} onBlur={handleBlur} />
                        {errors.name && touched.name ? <p className='form-error' color='red'>{errors.name}</p> : null}
                    </FormGroup>

                    <Row className="row-cols-sm-auto g-5 align-items-center">
                        <FormGroup>
                            <Label for="id"><b>ID</b></Label>
                            <Input invalid={errors.id && touched.id} valid={!errors.id && touched.id} placeholder="id..." type="text" name='id' id='id' size='sm' value={values.id} onChange={handleChange} onBlur={handleBlur} />
                            {errors.id && touched.id ? <p className='form-error' color='red'>{errors.id}</p> : null}

                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleDate">
                                <b>Birth Date</b>
                            </Label>
                            <Input
                                id="exampleDate"
                                name="bday"
                                placeholder="date placeholder"
                                type="date"
                                size='sm'
                                onChange={handleChange} onBlur={handleBlur} value={values.bday}
                                invalid={errors.bday && touched.bday} valid={!errors.bday && touched.bday}
                            />
                            {errors.bday && touched.bday ? <p className='form-error' color='red'>{errors.bday}</p> : null}
                        </FormGroup>
                    </Row>
                    <FormGroup>
                        <Label for="exampleEmail"><b>Email</b></Label>
                        <Input invalid={errors.email && touched.email} valid={!errors.email && touched.email} placeholder="email..." size='sm' type="email" name='email' id='email' value={values.email} onChange={handleChange} onBlur={handleBlur} />
                        {errors.email && touched.email ? <p className='form-error' color='red'>{errors.email}</p> : null}
                    </FormGroup>

                    <Row className="row-cols-sm-auto g-5 align-items-center">
                        <FormGroup>
                            <Label for="mobile"><b>mobile number</b></Label>
                            <Input invalid={errors.mobile && touched.mobile} valid={!errors.mobile && touched.mobile} placeholder="mobile..." size='sm' type="number" name='mobile' id='mobile' value={values.mobile} onChange={handleChange} onBlur={handleBlur} />
                            {errors.mobile && touched.mobile ? <p className='form-error' color='red'>{errors.mobile}</p> : null}
                        </FormGroup>
                        <FormGroup>
                            <Label for="adhaar"><b>Adhaar card number</b></Label>
                            <Input invalid={errors.adhaar && touched.adhaar} valid={!errors.adhaar && touched.adhaar} placeholder="adhaar number..." size='sm' type="number" name='adhaar' id='adhaar' value={values.adhaar} onChange={handleChange} onBlur={handleBlur} />
                            {errors.adhaar && touched.adhaar ? <p className='form-error' color='red'>{errors.adhaar}</p> : null}
                        </FormGroup>
                    </Row>



                    <Label for="password"><b>Gender</b></Label>
                    <FormGroup check>
                        <Input name="gender" value='male' type="radio" onChange={(e) => { setGender(e.target.value) }} />
                        <Label >
                            male
                        </Label>
                    </FormGroup>
                    <FormGroup check>
                        <Input name="gender" value='female' type="radio" onChange={(e) => { setGender(e.target.value) }} />
                        <Label>female</Label>
                    </FormGroup>


                    <FormGroup>
                        <Label for="password"><b>Set Password</b></Label>
                        <InputGroup size='sm'>
                            <Input invalid={errors.password && touched.password} valid={!errors.password && touched.password} placeholder="password..." type={showPassword ? 'text' : 'password'} name='password' size='sm' id='password' value={values.password} onBlur={handleBlur}
                                onChange={(e) => {
                                    handleChange(e);
                                    changePassword(e.target.value);
                                }} />
                            <InputGroupText size='sm'>
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    size="small"
                                >
                                    {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                </IconButton>
                            </InputGroupText>
                        </InputGroup>
                        {errors.password && touched.password ? <p className='form-error' color='red'>{errors.password}</p> : null}
                    </FormGroup>
                    <FormControl fullWidth sx={{ mt: -1 }}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item>
                                <Box sx={{ bgcolor: level?.color, width: 125, height: 5, borderRadius: '10px' }} />
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle1" fontSize="0.75rem">
                                    {level?.label}
                                </Typography>
                            </Grid>
                        </Grid>
                    </FormControl>

                    <FormGroup>
                        <Label for="exampleSelect"> <b>Residential Address</b>  </Label>
                        <Input invalid={errors.address && touched.address} valid={!errors.address && touched.address} placeholder="address..." size='sm' type="text" name='address' id='address' value={values.address} onChange={handleChange} onBlur={handleBlur} />
                        {errors.address && touched.address ? <p className='form-error' >{errors.address}</p> : null}
                    </FormGroup>



                    <Button Button color='success' >
                        Submit
                    </Button>

                </Form>

            </div>
            {/* <Grid container spacing={0} justifyContent='center' alignItems='center' md={3.5} border='0px solid black' padding='15px'>
                    <Formik
                        initialValues={{
                            name: '',
                            id: '',
                            email: '',
                            adhaar: '',
                            mobile: '',
                            password: '',
                            gender: '',
                            submit: null
                        }}
                        validationSchema={Yup.object().shape({
                            name: Yup.string().min(2).max(25).required('First Name is required'),
                            id: Yup.string().min(5).max(255).required('ID is required'),
                            email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                            adhaar: Yup.number().test('len', 'must be 12 digits', val => val.toString().length === 12).required('adhaar number is required'),
                            mobile: Yup.number().test('len', 'enter valid number', val => val.toString().length === 10).required('mobile number is required'),
                            password: Yup.string().min(5,'use least 5 characters').max(255).required('Password is required')
                        })}
                        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                            try {
                                console.log("hiiiii")

                                setStatus({ success: false });
                                setSubmitting(false);
                            } catch (err) {
                                console.error(err);
                                setStatus({ success: false });
                                setErrors({ submit: err.message });
                                setSubmitting(false);
                            }
                        }}
                    >
                        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                            <form noValidate onSubmit={handleSubmit}>
                                <Grid container spacing={1}>
                                    <Grid item xs={12} >
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="name-signup"><b>Name*</b> </InputLabel>
                                            <OutlinedInput
                                                id="name-login"
                                                value={name}
                                                name="name"
                                                // onBlur={handleBlur}
                                                size="small"
                                                onChange={(e) => { setName(e.target.value) }}
                                                placeholder="name..."
                                                fullWidth
                                                error={Boolean(touched.name && errors.name)}
                                            />
                                            {touched.name && errors.name && (
                                                <FormHelperText error id="helper-text-name-signup">
                                                    {errors.name}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="id-signup"><b>ID*</b></InputLabel>
                                            <OutlinedInput
                                                fullWidth
                                                error={Boolean(touched.id && errors.id)}
                                                id="id-signup"
                                                value={id}
                                                name="id"
                                                size='small'
                                                onChange={(e) => { setId(e.target.value) }}
                                                placeholder="id..."
                                                inputProps={{}}
                                            />
                                            {touched.id && errors.id && (
                                                <FormHelperText error id="helper-text-id-signup">
                                                    {errors.id}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="gender-signup"><b>Gender*</b></InputLabel>
                                            <RadioGroup aria-labelledby='demo-radio-buttons-group-label' defaultValue="none" name='gender'>
                                                <div className="gender">
                                                    <FormControlLabel value="male" control={<Radio />} label="male" />
                                                    <FormControlLabel value="female" control={<Radio />} label="female" />
                                                </div>
                                            </RadioGroup>
                                            {touched.gender && errors.gender && (
                                                <FormHelperText error gender="helper-text-gender-signup">
                                                    {errors.gender}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="company-signup"><b>Mobile number*</b></InputLabel>
                                            <OutlinedInput
                                                fullWidth
                                                error={Boolean(touched.mobile && errors.mobile)}
                                                id="mobile-signup"
                                                value={mobile}
                                                name="mobile"
                                                size="small"
                                                // onBlur={handleBlur}
                                                onChange={(e) => { setMobile(e.target.value) }}
                                                inputProps={{}}
                                            />
                                            {touched.mobile && errors.mobile && (
                                                <FormHelperText error id="helper-text-mobile-signup">
                                                    {errors.mobile}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="company-signup"><b>Adhaar card number*</b></InputLabel>
                                            <OutlinedInput
                                                fullWidth
                                                error={Boolean(touched.adhaar && errors.adhaar)}
                                                id="adhaar-signup"
                                                value={adhaar}
                                                name="adhaar"
                                                size="small"
                                                // onBlur={handleBlur}
                                                onChange={(e) => { setAdhaar(e.target.value) }}
                                                inputProps={{}}
                                            />
                                            {touched.adhaar && errors.adhaar && (
                                                <FormHelperText error id="helper-text-adhaar-signup">
                                                    {errors.adhaar}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="email-signup"><b>Email Address*</b></InputLabel>
                                            <OutlinedInput
                                                fullWidth
                                                error={Boolean(touched.email && errors.email)}
                                                id="email-login"
                                                type="email"
                                                value={email}
                                                name="email"
                                                size="small"
                                                // onBlur={handleBlur}
                                                onChange={(e) => { setEmail(e.target.value) }}
                                                placeholder="demo@adhaar.com"
                                                inputProps={{}}
                                            />
                                            {touched.email && errors.email && (
                                                <FormHelperText error id="helper-text-email-signup">
                                                    {errors.email}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="password-signup"><b>Password</b></InputLabel>
                                            <OutlinedInput
                                                fullWidth
                                                error={Boolean(touched.password && errors.password)}
                                                id="password-signup"
                                                type={showPassword ? 'text' : 'password'}
                                                value={password}
                                                name="password"
                                                size="small"
                                                // onBlur={handleBlur}

                                                onChange={(e) => { setPswd(e.target.value); changePassword(e.target.value); }}


                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                            size="large"
                                                        >
                                                            {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                                placeholder="******"
                                                inputProps={{}}
                                            />
                                            {touched.password && errors.password && (
                                                <FormHelperText error id="helper-text-password-signup">
                                                    {errors.password}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                        <FormControl fullWidth sx={{ mt: 2 }}>
                                            <Grid container spacing={2} alignItems="center">
                                                <Grid item>
                                                    <Box sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px' }} />
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant="subtitle1" fontSize="0.75rem">
                                                        {level?.label}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </FormControl>
                                    </Grid>

                                    {errors.submit && (
                                        <Grid item xs={12}>
                                            <FormHelperText error>{errors.submit}</FormHelperText>
                                        </Grid>
                                    )}
                                    <Grid item xs={12}>
                                        <Button
                                            disableElevation
                                            disabled={isSubmitting}
                                            fullWidth
                                            // size="large"
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                        // onClick={handleClick}
                                        >
                                            Create Account
                                        </Button>
                                    </Grid>

                                </Grid>

                            </form>
                        )}
                    </Formik>
                </Grid> */}

        </>
    )
}




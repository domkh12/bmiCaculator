import { useState } from 'react';
import { Container, Typography, TextField, Button, Card, CardContent, Box, CssBaseline, Paper, Switch } from '@mui/material';
import { FaExclamationTriangle, FaRegCheckCircle, FaUserMd, FaHeartbeat } from 'react-icons/fa';
import { keyframes } from '@emotion/react';

// Keyframe animation for the BMI result card
const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

export default function BMICalculator() {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [bmi, setBmi] = useState(null);
    const [category, setCategory] = useState('');
    const [icon, setIcon] = useState(null);
    const [cardStyle, setCardStyle] = useState({});
    const [isMetric, setIsMetric] = useState(true); // Metric system flag

    // Function to toggle units
    const handleUnitSwitch = () => {
        setIsMetric(!isMetric);
        setWeight('');
        setHeight('');
        setBmi(null);
        setCategory('');
    };

    // Conversion function for US units (lbs and inches)
    const convertToMetric = (w, h) => {
        if (!isMetric) {
            w = w * 0.453592; // pounds to kilograms
            h = h * 2.54 / 100; // inches to meters
        }
        return [w, h];
    };

    const calculateBMI = () => {
        let w = parseFloat(weight);
        let h = parseFloat(height);
        if (!w || !h) return;

        [w, h] = convertToMetric(w, h);

        const bmiValue = w / (h * h);
        setBmi(bmiValue.toFixed(2));

        // Set category and icon with appropriate styles based on BMI
        if (bmiValue < 16) {
            setCategory('Severe Thinness');
            setIcon(<FaExclamationTriangle style={{ color: '#e53935', fontSize: '2rem' }} />);
            setCardStyle({ backgroundColor: '#ffebee' });
        } else if (bmiValue >= 16 && bmiValue < 17) {
            setCategory('Moderate Thinness');
            setIcon(<FaExclamationTriangle style={{ color: '#f57c00', fontSize: '2rem' }} />);
            setCardStyle({ backgroundColor: '#fff3e0' });
        } else if (bmiValue >= 17 && bmiValue < 18.5) {
            setCategory('Mild Thinness');
            setIcon(<FaExclamationTriangle style={{ color: '#ffb300', fontSize: '2rem' }} />);
            setCardStyle({ backgroundColor: '#fff9c4' });
        } else if (bmiValue >= 18.5 && bmiValue < 25) {
            setCategory('Normal');
            setIcon(<FaRegCheckCircle style={{ color: '#388e3c', fontSize: '2rem' }} />);
            setCardStyle({ backgroundColor: '#c8e6c9' });
        } else if (bmiValue >= 25 && bmiValue < 30) {
            setCategory('Overweight');
            setIcon(<FaHeartbeat style={{ color: '#ff9800', fontSize: '2rem' }} />);
            setCardStyle({ backgroundColor: '#ffecb3' });
        } else if (bmiValue >= 30 && bmiValue < 35) {
            setCategory('Obese Class I');
            setIcon(<FaHeartbeat style={{ color: '#d32f2f', fontSize: '2rem' }} />);
            setCardStyle({ backgroundColor: '#ffccbc' });
        } else if (bmiValue >= 35 && bmiValue < 40) {
            setCategory('Obese Class II');
            setIcon(<FaHeartbeat style={{ color: '#c2185b', fontSize: '2rem' }} />);
            setCardStyle({ backgroundColor: '#f8bbd0' });
        } else if (bmiValue >= 40) {
            setCategory('Obese Class III');
            setIcon(<FaUserMd style={{ color: '#b71c1c', fontSize: '2rem' }} />);
            setCardStyle({ backgroundColor: '#f44336' });
        }
    };

    return (
        <>
            <CssBaseline />
            <Container maxWidth="sm" sx={{ mt: 5 }}>
                <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
                    <Typography variant="h4" align="center" gutterBottom>
                        BMI Calculator
                    </Typography>

                    <Box display="flex" alignItems="center" gap={2}>
                        <Typography variant="body1">Use Metric</Typography>
                        <Switch
                            checked={isMetric}
                            onChange={handleUnitSwitch}
                            inputProps={{ 'aria-label': 'unit switch' }}
                        />
                        <Typography variant="body1">Use US Units</Typography>
                    </Box>

                    <Box display="flex" flexDirection="column" gap={3}>
                        <TextField
                            label={isMetric ? "Weight (kg)" : "Weight (lbs)"}
                            variant="outlined"
                            fullWidth
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                        />
                        <TextField
                            label={isMetric ? "Height (m)" : "Height (inches)"}
                            variant="outlined"
                            fullWidth
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={calculateBMI}
                        >
                            Calculate BMI
                        </Button>
                    </Box>

                    {bmi && (
                        <Card sx={{ mt: 4, animation: `${fadeIn} 1s ease-in` }} style={cardStyle}>
                            <CardContent>
                                <Box display="flex" justifyContent="center" alignItems="center" gap={2}>
                                    {icon}
                                    <Typography variant="h6">Your BMI: {bmi}</Typography>
                                </Box>
                                <Typography variant="subtitle1" align="center">{category}</Typography>
                            </CardContent>
                        </Card>
                    )}
                </Paper>
            </Container>
        </>
    );
}

import express from 'express';
const router = express.Router();


router.get('/', (req, res) => {
    console.log('retiro|10');
    res.render('retiro10/consulta');
});

router.post('/retiro10', (req, res) =>{
    res.send('received');
})

export default router;

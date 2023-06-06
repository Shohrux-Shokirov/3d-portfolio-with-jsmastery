import { motion } from 'framer-motion';
import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { styles } from '../styles';
import { EarthCanvas } from './canvas';
import { SectionWrapper } from '../hoc';
import { slideIn } from '../utils/motion';

// templateID- template_syeokck
// serviceID- service_j1z6435
// publicKey- n3uj9mnv9MVfpLPVJ


const Contact = () => {

  const formRef = useRef()
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    emailjs.send(
      'service_j1z6435',
      'template_syeokck',
      {
        from_name: form.name,
        to_name: "Shohrux",
        from_email: form.email,
        to_email: 'shohruxshokirov260@gmail.com',
        message: form.message,
      },
      'n3uj9mnv9MVfpLPVJ'
    )
    .then(()=>{
      setLoading(false);
      alert('Message sent successfully!')
      setForm({
        name: "",
        email: "", 
        message: "",
      })
    }, 
    (error)=>{
      setLoading(false);
      console.log(error);
      alert("Something went wrong.")
    })
  }

  return (
    <div className='xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden'>
      <motion.div
        variants={slideIn('left', 'tween', 0.2, 1)}
        className='flex-[0.75] bg-black-100 p-8 rounded-2xl'>
        <p className={styles.sectionSubText}>Get in touch</p>
        <h2 className={styles.sectionHeadText}>Contact</h2>
        <form action=""
          ref={formRef}
          onSubmit={handleSubmit}
          className='mt-12 flex flex-col gap-8'>
          <label htmlFor="" className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your name</span>
            <input
              type="text"
              name='name'
              value={form.name}
              onChange={handleChange}
              placeholder='name'
              className='bg-tertiary py-4 px-6 text-white border-none outline-none
               rounded-lg font-medium placeholder:text-secondary'
            />
          </label>
          <label htmlFor="" className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your email</span>
            <input
              type="email"
              name='email'
              value={form.email}
              onChange={handleChange}
              placeholder='email'
              className='bg-tertiary py-4 px-6 text-white border-none outline-none
               rounded-lg font-medium placeholder:text-secondary'
            />
          </label>
          <label htmlFor="" className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your message</span>
            <textarea
              rows='7'
              name='message'
              value={form.message}
              onChange={handleChange}
              placeholder='message'
              className='bg-tertiary py-4 px-6 text-white border-none outline-none
               rounded-lg font-medium placeholder:text-secondary'
            />
          </label>
          <button type='submit'
            className='bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold
             shadow-md shadow-primary rounded-xl'>
            {loading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn('right', 'tween', 0.2, 1)}
        className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'>
        <EarthCanvas />
      </motion.div>
    </div>
  )
}

export default SectionWrapper(Contact, "contact")
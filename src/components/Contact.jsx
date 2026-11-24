import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send, Mail, Github, Linkedin, CheckCircle, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const EMAIL = 'anes.sifeddine.bousba@gmail.com';
const GITHUB = 'https://github.com/AnesSifeddineBousba';
const LINKEDIN = 'https://www.linkedin.com/in/αиєs-вσusba-835727448';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { t, dir } = useLanguage();

  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // 'sending' | 'success' | 'error'

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = t('contact.required');
    if (!form.email.trim()) {
      newErrors.email = t('contact.required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = t('contact.invalidEmail');
    }
    if (!form.subject.trim()) newErrors.subject = t('contact.required');
    if (!form.message.trim()) newErrors.message = t('contact.required');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('sending');

    try {
      // Integration-ready: Replace this URL with your backend endpoint
      // Examples: EmailJS, Formspree, custom API
      const FORM_ENDPOINT = '';

      if (!FORM_ENDPOINT) {
        // Fallback: open mailto link with form data
        const mailtoLink = `mailto:${EMAIL}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(
          `From: ${form.name} (${form.email})\n\n${form.message}`
        )}`;
        window.open(mailtoLink, '_blank');
        setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '' });
        return;
      }

      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (status) setStatus(null);
  };

  const inputClasses =
    'w-full bg-dark-400 border border-gray-800 rounded-lg px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/20 transition-all';

  return (
    <section id="contact" className="relative py-20 md:py-32" dir={dir}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold gold-gradient mb-4">
            {t('contact.sectionTitle')}
          </h2>
          <p className="text-gray-500 text-lg">{t('contact.sectionSubtitle')}</p>
          <div className="section-divider mt-6" />
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: dir === 'rtl' ? 30 : -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="glass rounded-2xl p-6 md:p-8">
              <h3 className="text-xl font-heading font-semibold text-white mb-6">
                {t('contact.formTitle')}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div>
                    <input
                      type="text"
                      placeholder={t('contact.name')}
                      value={form.name}
                      onChange={handleChange('name')}
                      className={`${inputClasses} ${errors.name ? 'border-red-500/50' : ''}`}
                    />
                    {errors.name && (
                      <p className="text-red-400 text-xs mt-1">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <input
                      type="email"
                      placeholder={t('contact.email')}
                      value={form.email}
                      onChange={handleChange('email')}
                      className={`${inputClasses} ${errors.email ? 'border-red-500/50' : ''}`}
                    />
                    {errors.email && (
                      <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <input
                    type="text"
                    placeholder={t('contact.subject')}
                    value={form.subject}
                    onChange={handleChange('subject')}
                    className={`${inputClasses} ${errors.subject ? 'border-red-500/50' : ''}`}
                  />
                  {errors.subject && (
                    <p className="text-red-400 text-xs mt-1">{errors.subject}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <textarea
                    placeholder={t('contact.message')}
                    value={form.message}
                    onChange={handleChange('message')}
                    rows={5}
                    className={`${inputClasses} resize-none ${errors.message ? 'border-red-500/50' : ''}`}
                  />
                  {errors.message && (
                    <p className="text-red-400 text-xs mt-1">{errors.message}</p>
                  )}
                </div>

                {/* Status Message */}
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-green-400 text-sm"
                  >
                    <CheckCircle size={16} />
                    {t('contact.success')}
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-red-400 text-sm"
                  >
                    <AlertCircle size={16} />
                    {t('contact.error')}
                  </motion.div>
                )}

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full sm:w-auto px-8 py-3 bg-gold-500 text-dark-900 font-semibold rounded-lg flex items-center justify-center gap-2 hover:bg-gold-400 transition-all duration-300 glow-gold-hover disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send size={18} />
                  {status === 'sending' ? t('contact.sending') : t('contact.send')}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Contact Links */}
          <motion.div
            initial={{ opacity: 0, x: dir === 'rtl' ? -30 : 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Email */}
            <a
              href={`mailto:${EMAIL}`}
              className="group glass rounded-xl p-6 flex items-center gap-4 hover:border-gold-500/20 transition-all duration-300 block"
            >
              <div className="w-12 h-12 rounded-lg bg-gold-500/10 flex items-center justify-center group-hover:bg-gold-500/20 transition-colors">
                <Mail size={22} className="text-gold-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">{t('contact.emailMe')}</p>
                <p className="text-white text-sm font-mono">{EMAIL}</p>
              </div>
            </a>

            {/* Social Links */}
            <div>
              <p className="text-gray-500 text-sm mb-4">{t('contact.orConnect')}</p>
              <div className="space-y-3">
                <a
                  href={GITHUB}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group glass rounded-xl p-5 flex items-center gap-4 hover:border-gold-500/20 transition-all duration-300 block"
                >
                  <div className="w-10 h-10 rounded-lg bg-dark-300 flex items-center justify-center group-hover:bg-gold-500/10 transition-colors">
                    <Github size={20} className="text-gray-400 group-hover:text-gold-500 transition-colors" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">GitHub</p>
                    <p className="text-gray-500 text-xs font-mono">@AnesSifeddineBousba (Αиєs_Вσusba)</p>
                  </div>
                </a>

                <a
                  href={LINKEDIN}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group glass rounded-xl p-5 flex items-center gap-4 hover:border-gold-500/20 transition-all duration-300 block"
                >
                  <div className="w-10 h-10 rounded-lg bg-dark-300 flex items-center justify-center group-hover:bg-gold-500/10 transition-colors">
                    <Linkedin size={20} className="text-gray-400 group-hover:text-gold-500 transition-colors" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">LinkedIn</p>
                    <p className="text-gray-500 text-xs font-mono">Αиєs_Вσusba</p>
                  </div>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

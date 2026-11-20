import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function DigitalClock() {
  const [time, setTime] = useState('');
  const { t } = useLanguage();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const algeriaTime = now.toLocaleTimeString('en-US', {
        timeZone: 'Africa/Algiers',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setTime(algeriaTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 glass rounded-lg">
      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
      <span className="font-mono text-xs text-gold-500">{time}</span>
      <span className="text-gray-600 text-[10px]">{t('clock.label')}</span>
    </div>
  );
}

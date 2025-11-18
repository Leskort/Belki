import { Mail, Phone, MapPin } from 'lucide-react'

export default function ContactsPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 horror-text">
            Контакты
          </h1>
          <p className="text-gray-400 text-lg">
            Свяжитесь с нами любым удобным способом
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-dark-200 rounded-lg p-6 border border-dark-300 text-center">
            <Phone className="w-8 h-8 mx-auto mb-4 text-forest-50" />
            <h3 className="text-lg font-bold text-white mb-2">Телефон</h3>
            <p className="text-gray-400">+375 (29) 123-45-67</p>
            <p className="text-gray-400">+375 (33) 123-45-67</p>
          </div>

          <div className="bg-dark-200 rounded-lg p-6 border border-dark-300 text-center">
            <Mail className="w-8 h-8 mx-auto mb-4 text-forest-50" />
            <h3 className="text-lg font-bold text-white mb-2">Email</h3>
            <p className="text-gray-400">info@elki.by</p>
            <p className="text-gray-400">orders@elki.by</p>
          </div>

          <div className="bg-dark-200 rounded-lg p-6 border border-dark-300 text-center">
            <MapPin className="w-8 h-8 mx-auto mb-4 text-forest-50" />
            <h3 className="text-lg font-bold text-white mb-2">Адрес</h3>
            <p className="text-gray-400">г. Минск</p>
            <p className="text-gray-400">ул. Лесная, 1</p>
          </div>
        </div>

        <div className="bg-dark-200 rounded-lg p-8 border border-dark-300">
          <h2 className="text-2xl font-bold text-white mb-6">
            Режим работы
          </h2>
          <div className="space-y-3 text-gray-300">
            <div className="flex justify-between">
              <span>Понедельник - Пятница</span>
              <span className="text-white">9:00 - 20:00</span>
            </div>
            <div className="flex justify-between">
              <span>Суббота</span>
              <span className="text-white">10:00 - 18:00</span>
            </div>
            <div className="flex justify-between">
              <span>Воскресенье</span>
              <span className="text-white">10:00 - 16:00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}



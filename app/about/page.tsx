import { TreePine } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <TreePine className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 text-forest-50 forest-glow" />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-4 horror-text text-horror-glow">
            О нас
          </h1>
        </div>

        <div className="space-y-8 text-gray-300">
          <section className="bg-dark-200 rounded-lg p-8 border border-dark-300">
            <h2 className="text-2xl font-bold text-white mb-4">
              Наша история
            </h2>
            <p className="leading-relaxed mb-4">
              Мы начали свой путь в самых тёмных лесах, где растут самые
              загадочные и красивые ёлки. Каждая ёлка в нашем магазине прошла
              долгий путь от тёмного леса до вашего дома.
            </p>
            <p className="leading-relaxed">
              Наша миссия — принести атмосферу настоящего праздника в каждый
              дом, используя только самые качественные и свежие ёлки из
              проверенных источников.
            </p>
          </section>

          <section className="bg-dark-200 rounded-lg p-8 border border-dark-300">
            <h2 className="text-2xl font-bold text-white mb-4">
              Почему мы?
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <TreePine className="w-5 h-5 text-forest-50 mt-1 flex-shrink-0" />
                <span>
                  <strong className="text-white">Свежесть:</strong> Все ёлки
                  срезаются непосредственно перед доставкой
                </span>
              </li>
              <li className="flex items-start gap-3">
                <TreePine className="w-5 h-5 text-forest-50 mt-1 flex-shrink-0" />
                <span>
                  <strong className="text-white">Качество:</strong> Мы
                  тщательно отбираем каждую ёлку
                </span>
              </li>
              <li className="flex items-start gap-3">
                <TreePine className="w-5 h-5 text-forest-50 mt-1 flex-shrink-0" />
                <span>
                  <strong className="text-white">Сервис:</strong> Полный спектр
                  услуг от установки до утилизации
                </span>
              </li>
              <li className="flex items-start gap-3">
                <TreePine className="w-5 h-5 text-forest-50 mt-1 flex-shrink-0" />
                <span>
                  <strong className="text-white">Атмосфера:</strong> Каждая ёлка
                  создаёт неповторимую атмосферу праздника
                </span>
              </li>
            </ul>
          </section>

          <section className="bg-dark-200 rounded-lg p-8 border border-dark-300">
            <h2 className="text-2xl font-bold text-white mb-4">
              Наши ценности
            </h2>
            <p className="leading-relaxed">
              Мы верим, что каждая ёлка — это не просто дерево, а символ
              праздника и радости. Мы заботимся о природе и предлагаем
              экологичную утилизацию после праздников. Наша цель — сделать ваш
              праздник незабываемым, сохраняя при этом баланс с природой.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}



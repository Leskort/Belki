import { TreePine, Package, Trash2, Truck } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function ServicesPage() {
  const services = [
    {
      icon: Truck,
      title: 'Доставка',
      description:
        'Быстрая и аккуратная доставка ёлок по всему городу. Мы доставляем вашу ёлку в специальной упаковке, чтобы сохранить её свежесть.',
      price: 'От 20 BYN',
    },
    {
      icon: Package,
      title: 'Установка',
      description:
        'Профессиональная установка ёлки в вашем доме. Наши специалисты установят и украсят вашу ёлку быстро и качественно.',
      price: 'От 50 BYN',
    },
    {
      icon: Trash2,
      title: 'Утилизация',
      description:
        'Экологичная утилизация ёлки после праздников. Мы заботимся о природе и предлагаем правильную утилизацию.',
      price: 'От 30 BYN',
    },
    {
      icon: TreePine,
      title: 'Консультация',
      description:
        'Бесплатная консультация по выбору ёлки, уходу и украшению. Наши специалисты помогут выбрать идеальную ёлку для вас.',
      price: 'Бесплатно',
    },
  ]

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <TreePine className="w-16 h-16 mx-auto mb-6 text-forest-50 forest-glow" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4 horror-text">
            Наши услуги
          </h1>
          <p className="text-gray-400 text-lg">
            Полный спектр услуг для вашего удобства
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <div
                key={index}
                className="bg-dark-200 rounded-lg p-8 border border-dark-300 hover:border-blood-50/50 transition-colors"
              >
                <Icon className="w-12 h-12 mb-4 text-forest-50" />
                <h3 className="text-2xl font-bold text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  {service.description}
                </p>
                <div className="text-xl font-bold text-blood-50 horror-text">
                  {service.price}
                </div>
              </div>
            )
          })}
        </div>

        <div className="text-center">
          <Link href="/catalog">
            <Button variant="primary">Посмотреть каталог</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}



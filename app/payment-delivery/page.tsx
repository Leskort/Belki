import { CreditCard, Truck, Shield, Clock } from 'lucide-react'

export default function PaymentDeliveryPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 horror-text">
            Оплата и доставка
          </h1>
          <p className="text-gray-400 text-lg">
            Всё, что нужно знать о заказе
          </p>
        </div>

        <div className="space-y-8">
          {/* Payment */}
          <section className="bg-dark-200 rounded-lg p-8 border border-dark-300">
            <div className="flex items-center gap-4 mb-6">
              <CreditCard className="w-8 h-8 text-forest-50" />
              <h2 className="text-2xl font-bold text-white">Способы оплаты</h2>
            </div>
            <div className="space-y-4 text-gray-300">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Наличными при получении
                </h3>
                <p>
                  Оплата наличными курьеру при доставке. Принимаем только
                  белорусские рубли.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Банковской картой
                </h3>
                <p>
                  Оплата картой онлайн или при получении. Принимаем карты Visa,
                  MasterCard, МИР.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Банковским переводом
                </h3>
                <p>
                  Оплата по счёту для юридических лиц. Счёт выставляется после
                  подтверждения заказа.
                </p>
              </div>
            </div>
          </section>

          {/* Delivery */}
          <section className="bg-dark-200 rounded-lg p-8 border border-dark-300">
            <div className="flex items-center gap-4 mb-6">
              <Truck className="w-8 h-8 text-forest-50" />
              <h2 className="text-2xl font-bold text-white">Доставка</h2>
            </div>
            <div className="space-y-4 text-gray-300">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Стоимость доставки
                </h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>По Минску: от 20 BYN</li>
                  <li>За пределы Минска: от 30 BYN (зависит от расстояния)</li>
                  <li>Бесплатная доставка при заказе от 200 BYN</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Сроки доставки
                </h3>
                <p>
                  Доставка осуществляется в течение 1-3 рабочих дней после
                  подтверждения заказа. В предпраздничные дни сроки могут
                  увеличиться.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Условия доставки
                </h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Доставка осуществляется в будние дни с 9:00 до 20:00</li>
                  <li>В выходные дни с 10:00 до 18:00</li>
                  <li>Точное время доставки согласовывается с менеджером</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Guarantees */}
          <section className="bg-dark-200 rounded-lg p-8 border border-dark-300">
            <div className="flex items-center gap-4 mb-6">
              <Shield className="w-8 h-8 text-forest-50" />
              <h2 className="text-2xl font-bold text-white">Гарантии</h2>
            </div>
            <div className="space-y-4 text-gray-300">
              <p>
                Мы гарантируем свежесть и качество каждой ёлки. Если вы
                получили товар ненадлежащего качества, мы заменим его или
                вернём деньги.
              </p>
              <p>
                Все ёлки срезаются непосредственно перед доставкой и хранятся в
                специальных условиях для сохранения свежести.
              </p>
            </div>
          </section>

          {/* Return */}
          <section className="bg-dark-200 rounded-lg p-8 border border-dark-300">
            <div className="flex items-center gap-4 mb-6">
              <Clock className="w-8 h-8 text-forest-50" />
              <h2 className="text-2xl font-bold text-white">
                Возврат и обмен
              </h2>
            </div>
            <div className="space-y-4 text-gray-300">
              <p>
                Возврат товара возможен в течение 7 дней после покупки при
                сохранении товарного вида и упаковки.
              </p>
              <p>
                Обмен товара производится в течение 14 дней при наличии товара
                на складе.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}



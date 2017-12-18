import { Currency } from './services/trade.service'
import { ContactMethod, ContactInformation } from './services/contact-information.service';
import { PaymentMethod } from './services/payment-method.service';

export class EnumHelper {
    static currencyToString(currency: Currency) {
        switch (currency) {
            case Currency.BTC:
                return "BTC";
            case Currency.BYR:
                return "BYR";
            case Currency.ETH:
                return "ETH";
            case Currency.LTC:
                return "LTC";
            case Currency.RUB:
                return "RUB";
            case Currency.USD:
                return "USD";
        }
    }

    static contactMethodToString(method: ContactMethod) {
        switch(method) {
            case ContactMethod.Email:
                return "Email";
            case ContactMethod.Facebook:
                return "Facebook";
            case ContactMethod.Instagram:
                return "Instagram";
            case ContactMethod.Telegram:
                return "Telegram";
            case ContactMethod.Vk:
                return "VK";
        }
    }

    static paymentMethodToString(method: PaymentMethod) {
        switch(method) {
            case PaymentMethod.PayPal:
                return "PayPal";
            case PaymentMethod.QIWI:
                return "QIWI";
            case PaymentMethod.YandexMoney:
                return "Yandex.Money";
        }
    }
}
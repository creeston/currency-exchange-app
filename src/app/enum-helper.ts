import { Currency } from './services/trade.service'

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
}
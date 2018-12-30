import "@babel/polyfill";
import React from "react";
import { Item } from "../components";
import renderer from "react-test-renderer";
import fetch, { Response } from "node-fetch";

jest.mock("node-fetch");
describe("<Item />", () => {

    it("renders correctly", () => {
        const tree = renderer.create(<Item />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    xit("calls fetch with the right args and returns response", async () => {

        // https://github.com/facebook/react/issues/14050#issuecomment-435658377
        const item = {
            id: "203387821",
            title: "Idealny IPHONE 5S GOLD + Gratisy",
            created: "dzisiaj 14:51",
            description:
                "Witam dziś mam na sprzedaż idealnego iphona 5s w kolorze złotym .  Jego stan oceniam na idealny. Wygląda jak nowy. Kolor złoty. Wersja 16 GB.  Na gwarancji Jeszcze z 3- miesiące.  Od początku szkło. Ostatnio nałożone nowe szkło z 3MK( flexible Glass 3D które chroni cały telefon z każdej strony)  dodatkowo jeszcze  w zapasie jedna sztuka na tyl). Pełen zestaw. Dodatkowo 2 oryginalne case z Apple i 2 z innych firm.  Zestaw marzenie. Interesuje mnie tylko sprzedaż, więc proszę nie piszcie mi innych ofert. Pozdrawiam.",
            params: [["Marka", "iPhone"], ["Stan", "Używane"]],
            city_label: "Katowice Śródmieście"
        };
        const match = {
            isExact: false,
            path: "/items/203387821",
            url: "/items/203387821"
        };

        fetch.mockReturnValue(Promise.resolve(new Response(item)));

        const tree = renderer.create(<Item />);
        
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith("/api/item?id=203387821");
    });
});

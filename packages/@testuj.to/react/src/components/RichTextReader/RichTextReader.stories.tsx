import React from "react";
import type { StoryObj, Meta } from "@storybook/react";

import { TTContextDecorator } from "../../context.util";
import { RichTextReader } from ".";

export default {
    component: RichTextReader,
    title: "Primitives/RichTextReader",
    parameters: {
        layout: "centered",
    },
    decorators: [
        TTContextDecorator,
    ],
} as Meta<typeof RichTextReader>;

export const Default: StoryObj<typeof RichTextReader> = {
    render: (args) => (
        <div style={{ width: "800px" }}>
            <RichTextReader {...args} />
        </div>
    ),
    args: {
        value: {
            json: JSON.stringify({
                blocks: [
                    {
                        key: "vo9b",
                        text: "",
                        type: "unstyled",
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {}
                    },
                    {
                        key: "84faa",
                        text: "Pomocí bezdrátové nabíjecí stanice Hexagon WCS310, která kombinuje styl a praktičnost, zlepšíte své každodenní nabíjení. Tato nabíjecí stanice 3 v 1 vám udrží pořádek na stole. Nabijte si telefon, sluchátka a chytré hodinky najednou. Už žádná starost s kabely. Elegantní šestiúhelníkový design je výrazným kouskem, který dodá sofistikovanost každému prostoru. Je promyšlena do posledního detailu. Nabíjení je nyní rychlé, bezpečné a bezproblémové. Díky magnetickému připojení Qi poskytuje Hexagon WCS310 efektivní nabíjení pro všechna vaše zařízení Apple. Dodává se s 20W adaptérem s vyměnitelnými koncovkami pro zásuvky EU/UK, takže budete připraveni kdekoli na cestách. Vestavěný LED indikátor a jemné podsvícení vás budou informovat o stavu nabíjení. Bezpečnost je standardně zajištěna 4 pokročilými ochranami (OCP, OVP, OTP, FOD), které vám zajistí klid při nabíjení plným výkonem (24 W). Nabíjecí stanice Hexagon WCS310 vám zjednoduší život. Konečně jedna nabíjecí stanice, která to všechno zvládne stylově.📷",
                        type: "unstyled",
                        depth: 0,
                        inlineStyleRanges: [
                            { offset: 143, length: 5, style: "BOLD" },
                            { offset: 177, length: 18, style: "BOLD" },
                            { offset: 197, length: 35, style: "BOLD" },
                            { offset: 568, length: 3, style: "BOLD" },
                            { offset: 613, length: 13, style: "BOLD" },
                            { offset: 682, length: 13, style: "BOLD" },
                            { offset: 698, length: 16, style: "BOLD" },
                            { offset: 789, length: 44, style: "BOLD" },
                            { offset: 886, length: 4, style: "BOLD" }
                        ],
                        entityRanges: [{ offset: 1012, length: 1, key: 0 }],
                        data: {}
                    },
                    {
                        key: "3t9f0",
                        text: "3 v 1: Nabíjejte 3 zařízení současně\nNabíjecí stanice Hexagon WCS310 má funkci 3 v 1. Nikdy to nebylo jednodušší. Zvládne nabít váš telefon, sluchátka i chytré hodinky. Už žádná starost s kabely, zatočte s nepořádkem na stole.📷",
                        type: "section",
                        depth: 0,
                        inlineStyleRanges: [{ offset: 0, length: 36, style: "BOLD" }],
                        entityRanges: [{ offset: 226, length: 1, key: 1 }],
                        data: {}
                    },
                    {
                        key: "9sgj8",
                        text: "Magnetické připojení QI\nUžijte si bezproblémové a spolehlivé nabíjení díky magnetickému připojení Qi. Již nemusíte svůj telefon ručně zarovnávat, dokonale padne na místo. Hexagon WCS310 má možnosti výstupního výkonu 15 W, 10 W, 7,5 W a 5 W, takže vyhoví jakýmkoli vašim potřebám nabíjení. Chytře přiděluje 2,5 W pro vaše chytré hodinky a 3 W pro vaše sluchátka, takže všechna vaše zařízení mohou být plně nabita za pouhé 2-3 hodiny.📷",
                        type: "section",
                        depth: 0,
                        inlineStyleRanges: [
                            { offset: 0, length: 23, style: "BOLD" },
                            { offset: 306, length: 5, style: "BOLD" },
                            { offset: 312, length: 23, style: "BOLD" },
                            { offset: 338, length: 22, style: "BOLD" }
                        ],
                        entityRanges: [{ offset: 432, length: 1, key: 2 }],
                        data: {}
                    },
                    {
                        key: "fs14u",
                        text: "Jedinečný design\nNespokojte se s obyčejným. Hexagon WCS310 má nápadný šestiúhelníkový tvar, který se stane funkčním středobodem vašeho pracovního stolu, nočního stolku nebo obývacího pokoje.📷",
                        type: "section",
                        depth: 0,
                        inlineStyleRanges: [{ offset: 0, length: 16, style: "BOLD" }],
                        entityRanges: [{ offset: 190, length: 1, key: 3 }],
                        data: {}
                    },
                    {
                        key: "12ur2",
                        text: "15W bezdrátové rychlé nabíjení\nZažijte bleskově rychlé nabíjení díky 15W bezdrátovému výstupu. Ať už telefon nabíjíte ve spěchu nebo ho plně nabíjíte přes noc, tato nabíječka dodává energii efektivně. Je rychlá, pohodlná a bez kabelů, takže snadno udrží krok s vašimi nejrušnějšími dny.📷",
                        type: "section",
                        depth: 0,
                        inlineStyleRanges: [{ offset: 0, length: 30, style: "BOLD" }],
                        entityRanges: [{ offset: 286, length: 1, key: 4 }],
                        data: {}
                    },
                    {
                        key: "b3frs",
                        text: "Bezdrátové nabíjení sluchátek\nAni vaše sluchátka nezůstanou pozadu. Nabíjecí stanice Hexagon WCS310 je vybavena speciálním nabíjecím místem pro vaše bezdrátová sluchátka.📷",
                        type: "section",
                        depth: 0,
                        inlineStyleRanges: [{ offset: 0, length: 29, style: "BOLD" }],
                        entityRanges: [{ offset: 170, length: 1, key: 5 }],
                        data: {}
                    },
                    {
                        key: "829bm",
                        text: "Kompatibilní se zařízeními Apple\nNabíjecí stanice Hexagon WCS310 je kompatibilní se zařízeními Apple. Takže snadno nabijete svůj iPhone, hodinky Apple Watch a sluchátka AirPods.📷",
                        type: "section",
                        depth: 0,
                        inlineStyleRanges: [{ offset: 0, length: 32, style: "BOLD" }],
                        entityRanges: [{ offset: 177, length: 1, key: 6 }],
                        data: {}
                    },
                    {
                        key: "fhf8n",
                        text: "4 typy ochrany\nHexagon WCS310 poskytuje 4 typy ochrany pro vaše zařízení. OCP (nadproudová ochrana), OVP (přepěťová ochrana), OTP (ochrana proti přehřátí) a FOD (detekce cizích předmětů) chrání vaše zařízení před potenciálním nebezpečím.📷",
                        type: "section",
                        depth: 0,
                        inlineStyleRanges: [{ offset: 0, length: 14, style: "BOLD" }],
                        entityRanges: [{ offset: 237, length: 1, key: 7 }],
                        data: {}
                    },
                    {
                        key: "isaa",
                        text: "Součástí balení je 20W adaptér (pro zásuvky EU/UK)\nV balení najdete vše, co potřebujete. Nabíjecí stanice Hexagon WCS310 je dodávána s 20W adaptérem. Díky vyměnitelným koncovkách pro zásuvky EU a UK si ji můžete vzít kamkoli s sebou.📷",
                        type: "section",
                        depth: 0,
                        inlineStyleRanges: [{ offset: 0, length: 50, style: "BOLD" }],
                        entityRanges: [{ offset: 233, length: 1, key: 8 }],
                        data: {}
                    },
                    {
                        key: "4tpnr",
                        text: "📷",
                        type: "section",
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [{ offset: 0, length: 1, key: 9 }],
                        data: {}
                    }
                ],
                entityMap: {
                    "0": {
                        type: "IMAGE",
                        mutability: "IMMUTABLE",
                        data: {
                            height: "590",
                            src: "https://cdn0.it4profit.com/s3size/el:t/f:webp/h:590/rt:fill/w:590/plain/s3://cms/product/9e/01/9e0194fc842eebc3780d66406f6461a1/cns_wcs310dgbl_1_1.webp",
                            width: "590"
                        }
                    },
                    "1": {
                        type: "IMAGE",
                        mutability: "IMMUTABLE",
                        data: {
                            src: "https://cdn0.it4profit.com/s3size/el:t/f:webp/rt:fill/plain/s3://cms/product/98/e8/98e800915c3ccb332843dfd5a6b5a2a4/102.webp"
                        }
                    },
                    "2": {
                        type: "IMAGE",
                        mutability: "IMMUTABLE",
                        data: {
                            src: "https://cdn0.it4profit.com/s3size/el:t/f:webp/rt:fill/plain/s3://cms/product/1f/6f/1f6f13a548f6c5bb61a32adcd5440491/103.webp"
                        }
                    },
                    "3": {
                        type: "IMAGE",
                        mutability: "IMMUTABLE",
                        data: {
                            src: "https://cdn0.it4profit.com/s3size/el:t/f:webp/rt:fill/plain/s3://cms/product/ca/2b/ca2b90f4b58501d5dfb19106c50611e4/104.webp"
                        }
                    },
                    "4": {
                        type: "IMAGE",
                        mutability: "IMMUTABLE",
                        data: {
                            src: "https://cdn0.it4profit.com/s3size/el:t/f:webp/rt:fill/plain/s3://cms/product/6c/6c/6c6c268513012b0c1d0dd617f1e09f7e/105.webp"
                        }
                    },
                    "5": {
                        type: "IMAGE",
                        mutability: "IMMUTABLE",
                        data: {
                            src: "https://cdn0.it4profit.com/s3size/el:t/f:webp/rt:fill/plain/s3://cms/product/ac/52/ac52609d9299cc18884bf0f804f31c80/106.webp"
                        }
                    },
                    "6": {
                        type: "IMAGE",
                        mutability: "IMMUTABLE",
                        data: {
                            src: "https://cdn0.it4profit.com/s3size/el:t/f:webp/rt:fill/plain/s3://cms/product/5d/a3/5da359ca9cc21d63869e16f0fc0d35c7/107.webp"
                        }
                    },
                    "7": {
                        type: "IMAGE",
                        mutability: "IMMUTABLE",
                        data: {
                            src: "https://cdn0.it4profit.com/s3size/el:t/f:webp/rt:fill/plain/s3://cms/product/ee/02/ee02a93bf1ac4e86199d4c8555b15d13/108.webp"
                        }
                    },
                    "8": {
                        type: "IMAGE",
                        mutability: "IMMUTABLE",
                        data: {
                            src: "https://cdn0.it4profit.com/s3size/el:t/f:webp/rt:fill/plain/s3://cms/product/82/dd/82dd1f2c7ce1b83fae6bfc5c4b94d956/109.webp"
                        }
                    },
                    "9": {
                        type: "IMAGE",
                        mutability: "IMMUTABLE",
                        data: {
                            height: "20",
                            src: "https://cdn0.it4profit.com/s3size/el:t/h:20/rt:fill/w:20/plain/s3://cms/product/98/69/9869f2fa65d1dee705ca96da82ef8465/checkbox1.webp",
                            width: "20"
                        }
                    }
                }
            })
        },
    },
};

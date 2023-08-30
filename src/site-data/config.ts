import siteData from "./site-data";

type SiteData = typeof siteData;

class Config {
    #data: SiteData;
    constructor(siteData: SiteData) {
        this.#data = siteData;
    }
    get siteName() {
        return this.#data.siteName;
    }
    get postAdress() {
        return this.#data.adresser.post;
    }
    get besoksAdress() {
        return this.#data.adresser.besok;
    }
    get telefon() {
        return this.#data.telefon;
    }
    get telefonNoSpaces() {
        return this.telefon.replace(/\s+/g, "");
    }
    get email() {
        return this.#data.email;
    }
    get googleMapBesoksAdress() {
        return this.#data.googleMaps.besoksAdress;
    }
    get googleMapPostAdress() {
        return this.#data.googleMaps.postAdress;
    }
    get googleMapHittaHit() {
        return this.#data.googleMaps.hittaHit;
    }
    get socialCardDescr() {
        return this.#data.socialCard.descr;
    }
    get siteMetaDescr() {
        return this.#data.siteMetaDescr;
    }
}

export const config = new Config(siteData);

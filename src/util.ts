type ImageDataInput = [
    string, // title
    string, // src
    boolean // noClick
];
export function makeImageData(arr: ImageDataInput[]) {
    return arr.map(([title, src, noClick]) => ({ title, src, noClick }));
}

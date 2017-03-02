import path from 'path';
import fs from 'fs-extra';


export default function refreshMocks(){
    const source = path.resolve("./mocks/clean/userdir");
    const destination = path.resolve("./mocks/userdir");
    fs.copySync(source, destination);
}

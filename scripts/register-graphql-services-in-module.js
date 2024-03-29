var fs = require('fs');
var url = require('url');
var path = require('path');
var rootDir = require('app-root-path');
var generatedFilePath = path.resolve(rootDir.toString(), 'src/app/graphql/generated/graphql.ts');
var modulePath = path.resolve(rootDir.toString(), 'src/app/graphql/generated/graphql-services.module.ts');
var regexToExtractServiceNames = /export\s*class\s*([a-zA-Z0-9]*)\s*extends\s*Apollo\./;
var emptyModule = "/* THIS FILE IS AUTOMATICALLY GENERATED */\n/* tslint:disable */\nimport { NgModule } from '@angular/core';\nGENERATED_SERVICE_IMPORT\n\n@NgModule({\n  imports: [],\n  exports: [],\n  declarations: [],\n  providers: [\n    GENERATED_SERVICE_DECLARATION\n  ],\n})\nexport class GraphQLServices {\n}\n";
var checkFileExistence = function (filePath) {
    return !fs.existsSync(filePath);
};
var openFile = function (filePath) {
    return fs.readFileSync(filePath, { encoding: 'utf8' });
};
var saveFile = function (filePath, fileContent) {
    fs.writeFileSync(filePath, fileContent, { encoding: 'utf8' });
};
var findServicesNames = function (data) {
    var serviceNames = [];
    var services = data.split('@Injectable');
    if (services.length < 1) {
        return [];
    }
    services.slice(1).forEach(function (tt) {
        var className = tt.match(regexToExtractServiceNames);
        if (className[1]) {
            serviceNames.push(className[1]);
        }
    });
    return serviceNames;
};
var registerServicesInGraphQLModule = function (servicesNames) {
    var newModule = emptyModule;
    var services = servicesNames.join(', ');
    var imports = "import { " + services + " } from './graphql';";
    newModule = newModule.replace(/GENERATED_SERVICE_IMPORT/, imports);
    newModule = newModule.replace(/GENERATED_SERVICE_DECLARATION/, services);
    saveFile(modulePath, newModule);
};
try {
    checkFileExistence(generatedFilePath);
    var generatedFile = openFile(generatedFilePath);
    var serviceNames = findServicesNames(generatedFile);
    registerServicesInGraphQLModule(serviceNames);
    console.log('GraphQL services registered successfully');
}
catch (e) {
    console.error('An error occured during the registration of GraphQL services: ', e);
}

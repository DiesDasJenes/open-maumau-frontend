import 'zone.js';
import 'zone.js/testing';
import { getTestBed  } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import '@testing-library/jest-dom';

getTestBed().initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());

Object.defineProperty(document, 'doctype', {
    value: '<!DOCTYPE html>'
});
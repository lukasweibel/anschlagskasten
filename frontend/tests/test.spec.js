// @ts-check
import { test, expect } from '@playwright/test';

test('create Anschlag', async({ page }) => {
    await page.goto('http://localhost:8080');

    await page.waitForSelector('a[href="#/anschlagform"]');

    await page.click('a[href="#/anschlagform"]');

    await page.fill('input[placeholder="Edit Pin"]', '112232');
    await page.selectOption('select', { value: 'Adalia' });
    await page.fill('input[placeholder="Ceviname"]', 'Fokus');
    await page.fill('input[type="date"]', '2023-06-26');
    await page.fill('input[placeholder="Begrüssung"]', 'Hallo Zemme');
    await page.fill('input[placeholder="Besammeln, Ort"]', 'Findling');
    await page.fill('input[placeholder="Besammeln, Zeit"]', 'ca. am 14:00');
    await page.fill('input[placeholder="Schluss, Ort"]', 'Bihü');
    await page.fill('input[placeholder="Schluss, Zeit"]', 'am 17:00');
    await page.fill('input[placeholder="Mitbringen"]', 'Esse und z Trinke');
    await page.fill('input[placeholder="Schlusswort"]', 'Bis den');

    await page.waitForSelector('#submitButton');
    await page.click('#submitButton');

    await page.waitForSelector('a[href="#/"]');
    await page.click('a[href="#/"]');
});

test('check details', async({ page }) => {
    await page.goto('http://localhost:8080');
    const pElement = await page.waitForSelector('p:has-text("Adalia")');
    await pElement.click();

    const titleElement = await page.waitForSelector('h1');
    const titleValue = await titleElement.textContent();
    expect(titleValue).toBe('Adalia');
});

export {};
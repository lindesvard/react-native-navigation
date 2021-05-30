import Utils from './Utils';
import TestIDs from '../playground/src/testIDs';
import Android from './AndroidUtils';
import testIDs from '../playground/src/testIDs';

const { elementByLabel, elementById } = Utils;

describe('Back Button', () => {
  beforeEach(async () => {
    await device.launchApp({ newInstance: true });
    await elementById(TestIDs.NAVIGATION_TAB).tap();
    await elementById(TestIDs.BACK_BUTTON_SCREEN_BTN).tap();
    await elementById(TestIDs.STATIC_EVENTS_OVERLAY_BTN).tap();
  });

  it.e2e('prevents pop and dispatch event', async () => {
    await elementById(TestIDs.PUSH_DISABLED_BACK_BTN).tap();
    await elementById(TestIDs.CLEAR_OVERLAY_EVENTS_BTN).tap();
    await elementById(TestIDs.BACK_BUTTON).tap();
    await expect(elementByLabel('navigationButtonPressed | RNN.back')).toBeVisible();
    await expect(elementById(testIDs.PUSHED_SCREEN_HEADER)).toBeVisible();
  });

  it('pops and does not dispatch event', async () => {
    await elementById(TestIDs.PUSH_BTN).tap();
    await elementById(TestIDs.CLEAR_OVERLAY_EVENTS_BTN).tap();
    await elementById(TestIDs.BACK_BUTTON).tap();
    await expect(elementByLabel('navigationButtonPressed | RNN.back')).toBeNotVisible();
  });

  it.e2e(':android: hardware back button prevents pop and dispatch event', async () => {
    await elementById(TestIDs.PUSH_DISABLED_HARDWARE_BACK_BTN).tap();
    await elementById(TestIDs.CLEAR_OVERLAY_EVENTS_BTN).tap();
    Android.pressBack();
    await expect(elementByLabel('navigationButtonPressed | RNN.hardwareBackButton')).toBeVisible();
    await expect(elementById(testIDs.PUSHED_SCREEN_HEADER)).toBeVisible();
  });

  it.e2e(':android: hardware button pops and does not dispatch event', async () => {
    await elementById(TestIDs.PUSH_BTN).tap();
    await elementById(TestIDs.CLEAR_OVERLAY_EVENTS_BTN).tap();
    Android.pressBack();
    await expect(
      elementByLabel('navigationButtonPressed | RNN.hardwareBackButton')
    ).toBeNotVisible();
    await expect(elementById(testIDs.PUSHED_SCREEN_HEADER)).toBeNotVisible();
  });

  it.e2e(':android: hardware back should not dismiss modal and dispatch event', async () => {
    await elementById(TestIDs.MODAL_DISABLED_BACK_BTN).tap();
    await expect(elementByLabel('Modal')).toBeVisible();
    Android.pressBack();
    await expect(elementByLabel('Modal')).toBeVisible();
    await expect(elementByLabel('navigationButtonPressed | RNN.hardwareBackButton')).toBeVisible();
  });
});

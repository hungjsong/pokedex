import { render, screen, cleanup } from '@testing-library/react';
import EVSlider from '../teamBuilder/EVSlider';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import '@testing-library/jest-dom/extend-expect';

describe('Render EV Slider', () => {
  render(
    <Provider store={store}>
      <EVSlider
        evStatValue={200}
        evName={'hp'}
        teamSlotNumber={2}
        remainingEVs={310}
      />
    </Provider>
  );

  const evSliderElement = screen.getByTestId('evSlider');
  const evSliderNumberValue = screen.getByTestId('evSliderNumberValue');
  const evSliderStepValue = screen.getByTestId('evSliderStepValue');

  test('Check if EV Slider is rendered', () => {
    expect(evSliderElement).toBeInTheDocument();
  });

  test('Check if slider step value is = 200', () => {
    expect(evSliderNumberValue.value).toBe('200');
  });

  test('Check if input number value is = 200', () => {
    expect(evSliderStepValue.value).toBe('200');
  });
});

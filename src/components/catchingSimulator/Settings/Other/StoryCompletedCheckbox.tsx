import { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { setStoryCompletion } from '../../../../redux/catchingSimulatorSlice';

function StoryCompletedCheckBox() {
  const storyCompletionStatus = useAppSelector(
    (state) => state.catchingSimulator.storyCompleted
  );
  const dispatch = useAppDispatch();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    dispatch(setStoryCompletion({ completionStatus: event.target.checked }));
  }

  return (
    <label>
      Story Completed:
      <input
        type="checkbox"
        checked={storyCompletionStatus}
        onChange={handleChange}
      />
    </label>
  );
}

export default StoryCompletedCheckBox;

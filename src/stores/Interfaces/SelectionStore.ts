import { SelectedItem } from '../../types';

interface ISelectionStore {
	selectedItems: SelectedItem[];
	setSelectedItems: (items: SelectedItem[]) => void;
	clearSelectedItems: () => void;
}

export default ISelectionStore;

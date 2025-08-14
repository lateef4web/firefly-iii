import RuleForm, {RuleData} from '@/components/rules/RuleForm';

export default function EditRulePage() {
    const initial: RuleData = {
        title: 'Sample rule',
        description: 'Example description',
        triggers: [
            {type: 'description_is', prohibited: false, value: 'Test', stopProcessing: false},
        ],
        actions: [
            {type: 'set_category', value: 'Sample', stopProcessing: false},
        ],
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl mb-4">Edit Rule</h1>
            <RuleForm initial={initial} />
        </div>
    );
}

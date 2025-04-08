import React, { KeyboardEvent, useRef, useEffect } from 'react';

interface QueryParam {
  key: string;
  value: string;
  enabled: boolean;
}

interface QueryParamsProps {
  params: QueryParam[];
  onParamsChange: (params: QueryParam[]) => void;
}

const QueryParams: React.FC<QueryParamsProps> = ({ params, onParamsChange }) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, params.length);
  }, [params.length]);

  const handleParamChange = (index: number, field: keyof QueryParam, value: string | boolean) => {
    const newParams = [...params];
    newParams[index] = { ...newParams[index], [field]: value };
    onParamsChange(newParams);
  };

  const handleAddParam = () => {
    onParamsChange([...params, { key: '', value: '', enabled: true }]);
  };

  const handleRemoveParam = (index: number) => {
    const newParams = params.filter((_, i) => i !== index);
    onParamsChange(newParams);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (event.key === 'Enter' && !event.shiftKey && !event.ctrlKey && !event.altKey) {
      event.preventDefault();
      if (index === params.length - 1 && (params[index].key || params[index].value)) {
        handleAddParam();
      }
    }
  };

  useEffect(() => {
    const lastIndex = params.length - 1;
    if (lastIndex >= 0 && inputRefs.current[lastIndex]) {
      inputRefs.current[lastIndex]?.focus();
    }
  }, [params.length]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium text-gray-700">Query Parameters</h3>
        <button
          onClick={handleAddParam}
          className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Parameter
        </button>
      </div>
      <div className="space-y-3">
        {params.map((param, index) => (
          <div key={index} className="flex items-center space-x-2">
            <button
              onClick={() => handleParamChange(index, 'enabled', !param.enabled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                param.enabled ? 'bg-green-600' : 'bg-gray-200'
              }`}
              role="switch"
              aria-checked={param.enabled}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  param.enabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <input
              ref={el => (inputRefs.current[index] = el)}
              type="text"
              value={param.key}
              onChange={e => handleParamChange(index, 'key', e.target.value)}
              onKeyDown={e => handleKeyDown(e, index)}
              placeholder="Key"
              className="block w-1/3 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            <input
              type="text"
              value={param.value}
              onChange={e => handleParamChange(index, 'value', e.target.value)}
              onKeyDown={e => handleKeyDown(e, index)}
              placeholder="Value"
              className="block w-1/3 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            <button
              onClick={() => handleRemoveParam(index)}
              className="inline-flex items-center p-1 border border-transparent rounded-full text-red-700 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QueryParams;

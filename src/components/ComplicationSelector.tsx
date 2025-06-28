import React from 'react';
import { complications } from '../data/complications';
import { ComplicationConfig } from '../types';

interface ComplicationSelectorProps {
  selectedComplications: ComplicationConfig[];
  onComplicationToggle: (complicationId: string) => void;
}

export const ComplicationSelector: React.FC<ComplicationSelectorProps> = ({
  selectedComplications,
  onComplicationToggle
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">选择需要管理的并发症</h2>
        <p className="text-gray-600">请选择您需要生成指引卡的并发症类型</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {complications.map((complication) => {
          const isSelected = selectedComplications.some(c => c.id === complication.id && c.enabled);
          
          return (
            <div
              key={complication.id}
              onClick={() => onComplicationToggle(complication.id)}
              className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                isSelected
                  ? 'border-red-500 bg-red-50 shadow-md'
                  : 'border-gray-200 bg-white hover:border-red-300'
              }`}
            >
              <div className="flex items-center mb-3">
                <span className="text-3xl mr-3">{complication.icon}</span>
                <h3 className={`text-lg font-semibold ${
                  isSelected ? 'text-red-700' : 'text-gray-800'
                }`}>
                  {complication.name}
                </h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                {complication.description}
              </p>
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-700">主要预警信号：</h4>
                <ul className="text-xs text-gray-600 space-y-1">
                  {complication.emergencySignals.slice(0, 3).map((signal, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-red-500 mr-1">•</span>
                      {signal}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
        <div className="flex items-start">
          <div className="text-blue-500 mr-2">💡</div>
          <div>
            <h4 className="text-sm font-medium text-blue-800 mb-1">温馨提示</h4>
            <p className="text-sm text-blue-700">
              建议选择您最关心或最可能遇到的并发症类型。您可以选择多个并发症，系统会为您生成综合性的管理指引卡。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
import React from 'react';
import { Plus, Trash2, AlertTriangle, Phone } from 'lucide-react';
import { MedicalInfo, AnticoagulationInfo, CurrentMedications, Medication } from '../types';

interface MedicalInfoFormProps {
  medicalInfo: MedicalInfo;
  anticoagulation: AnticoagulationInfo;
  currentMedications: CurrentMedications;
  onMedicalInfoChange: (info: MedicalInfo) => void;
  onAnticoagulationChange: (info: AnticoagulationInfo) => void;
  onCurrentMedicationsChange: (medications: CurrentMedications) => void;
}

const medicationCategories = [
  '化疗药物',
  '止痛药物',
  '胃肠道药物',
  '抗生素',
  '抗凝药物',
  '激素类药物',
  '免疫抑制剂',
  '心血管药物',
  '其他药物'
];

export const MedicalInfoForm: React.FC<MedicalInfoFormProps> = ({
  medicalInfo,
  anticoagulation,
  currentMedications,
  onMedicalInfoChange,
  onAnticoagulationChange,
  onCurrentMedicationsChange
}) => {
  const addMedication = () => {
    const newMedication: Medication = {
      id: Date.now().toString(),
      name: '',
      category: '化疗药物',
      dosage: '',
      frequency: '',
      lastTaken: '',
      notes: ''
    };
    onCurrentMedicationsChange({
      medications: [...currentMedications.medications, newMedication]
    });
  };

  const removeMedication = (id: string) => {
    onCurrentMedicationsChange({
      medications: currentMedications.medications.filter(med => med.id !== id)
    });
  };

  const updateMedication = (id: string, field: keyof Medication, value: string) => {
    onCurrentMedicationsChange({
      medications: currentMedications.medications.map(med =>
        med.id === id ? { ...med, [field]: value } : med
      )
    });
  };

  const getMedicationsByCategory = (category: string) => {
    return currentMedications.medications.filter(med => med.category === category);
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">填写医疗信息</h2>
        <p className="text-gray-600">请填写您的基本医疗信息，这些信息将用于生成个性化的指引卡</p>
      </div>

      {/* 基本信息 */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <span className="text-red-500 mr-2">👤</span>
          基本信息
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">姓名</label>
            <input
              type="text"
              value={medicalInfo.name}
              onChange={(e) => onMedicalInfoChange({ ...medicalInfo, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="请输入姓名"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">年龄</label>
            <input
              type="text"
              value={medicalInfo.age}
              onChange={(e) => onMedicalInfoChange({ ...medicalInfo, age: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="请输入年龄"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              血型
              <AlertTriangle className="w-4 h-4 ml-1 text-red-500" />
            </label>
            <select
              value={medicalInfo.bloodType}
              onChange={(e) => onMedicalInfoChange({ ...medicalInfo, bloodType: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="">请选择血型</option>
              <option value="A型">A型</option>
              <option value="B型">B型</option>
              <option value="AB型">AB型</option>
              <option value="O型">O型</option>
            </select>
            {medicalInfo.bloodType && (
              <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-md">
                <div className="flex items-start">
                  <Phone className="w-4 h-4 text-red-500 mr-2 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-red-800 mb-1">重要提醒：</p>
                    <p className="text-red-700">
                      请提前第一时间通过电话或微信通知急诊接诊医院，告知血型为 <strong>{medicalInfo.bloodType}</strong>，
                      便于医院提前调配血液制品，节省抢救时间。
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">身份证号</label>
            <input
              type="text"
              value={medicalInfo.idNumber}
              onChange={(e) => onMedicalInfoChange({ ...medicalInfo, idNumber: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="请输入身份证号"
            />
          </div>
        </div>
      </div>

      {/* 疾病史 */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <span className="text-red-500 mr-2">🏥</span>
          疾病史
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">主要诊断</label>
            <input
              type="text"
              value={medicalInfo.mainDiagnosis}
              onChange={(e) => onMedicalInfoChange({ ...medicalInfo, mainDiagnosis: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="如：胰腺癌、胃癌等"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">手术史</label>
            <textarea
              value={medicalInfo.surgeryHistory}
              onChange={(e) => onMedicalInfoChange({ ...medicalInfo, surgeryHistory: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              rows={2}
              placeholder="请描述既往手术情况"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">药物过敏</label>
            <input
              type="text"
              value={medicalInfo.allergies}
              onChange={(e) => onMedicalInfoChange({ ...medicalInfo, allergies: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="如：青霉素过敏等，无过敏可填写'无'"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">其他疾病</label>
            <textarea
              value={medicalInfo.otherDiseases}
              onChange={(e) => onMedicalInfoChange({ ...medicalInfo, otherDiseases: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              rows={2}
              placeholder="如：高血压、糖尿病等"
            />
          </div>
        </div>
      </div>

      {/* 抗凝治疗史 */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <span className="text-red-500 mr-2">💊</span>
          抗凝治疗史
        </h3>
        <div className="space-y-4">
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={anticoagulation.isOnAnticoagulation}
                onChange={(e) => onAnticoagulationChange({ ...anticoagulation, isOnAnticoagulation: e.target.checked })}
                className="mr-2 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
              />
              <span className="text-sm font-medium text-gray-700">正在进行抗凝治疗</span>
            </label>
          </div>
          {anticoagulation.isOnAnticoagulation && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">抗凝药物种类</label>
                <input
                  type="text"
                  value={anticoagulation.medicationType}
                  onChange={(e) => onAnticoagulationChange({ ...anticoagulation, medicationType: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="如：华法林、利伐沙班等"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">最后服用时间</label>
                <input
                  type="text"
                  value={anticoagulation.lastTaken}
                  onChange={(e) => onAnticoagulationChange({ ...anticoagulation, lastTaken: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="如：今日上午、昨日晚上等"
                />
              </div>
            </>
          )}
        </div>
      </div>

      {/* 当前用药清单 */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <span className="text-red-500 mr-2">💉</span>
            当前用药清单
          </h3>
          <button
            onClick={addMedication}
            className="flex items-center px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            <Plus className="w-4 h-4 mr-1" />
            添加药物
          </button>
        </div>

        {medicationCategories.map(category => {
          const categoryMeds = getMedicationsByCategory(category);
          if (categoryMeds.length === 0) return null;

          return (
            <div key={category} className="mb-6">
              <h4 className="text-md font-medium text-gray-700 mb-3 border-b border-gray-200 pb-2">
                {category}
              </h4>
              <div className="space-y-3">
                {categoryMeds.map(medication => (
                  <div key={medication.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">药物名称</label>
                        <input
                          type="text"
                          value={medication.name}
                          onChange={(e) => updateMedication(medication.id, 'name', e.target.value)}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500"
                          placeholder="请输入药物名称"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">分类</label>
                        <select
                          value={medication.category}
                          onChange={(e) => updateMedication(medication.id, 'category', e.target.value)}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500"
                        >
                          {medicationCategories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">剂量</label>
                        <input
                          type="text"
                          value={medication.dosage}
                          onChange={(e) => updateMedication(medication.id, 'dosage', e.target.value)}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500"
                          placeholder="如：100mg"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">服用频率</label>
                        <input
                          type="text"
                          value={medication.frequency}
                          onChange={(e) => updateMedication(medication.id, 'frequency', e.target.value)}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500"
                          placeholder="如：每日2次"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">最后服用时间</label>
                        <input
                          type="text"
                          value={medication.lastTaken}
                          onChange={(e) => updateMedication(medication.id, 'lastTaken', e.target.value)}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500"
                          placeholder="如：今日上午8点"
                        />
                      </div>
                      <div className="flex items-end">
                        <button
                          onClick={() => removeMedication(medication.id)}
                          className="flex items-center justify-center px-2 py-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">备注</label>
                      <input
                        type="text"
                        value={medication.notes}
                        onChange={(e) => updateMedication(medication.id, 'notes', e.target.value)}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500"
                        placeholder="特殊说明或注意事项"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {currentMedications.medications.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p className="mb-2">暂无用药记录</p>
            <p className="text-sm">点击"添加药物"按钮开始添加您的用药信息</p>
          </div>
        )}
      </div>
    </div>
  );
};
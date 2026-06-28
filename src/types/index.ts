// src/types/index.ts
// Kompletne typy dla systemu PIZZA DOUGH ERP LITE

// ─── ENUMY ────────────────────────────────────────

export type IngredientCategory = 'mąka' | 'woda' | 'sól' | 'drożdże' | 'oliwa' | 'cukier' | 'dodatki';

export type UnitType = 'kg' | 'g' | 'l' | 'ml' | 'szt';

export type UserRole = 'OWNER' | 'MANAGER' | 'PIZZAIOLO';

export type BatchStatus = 'planned' | 'in_progress' | 'completed' | 'cancelled';

export type LossType = 'inventory' | 'production' | 'fermentation' | 'ingredient' | 'financial';

export type TransactionType = 'purchase' | 'production' | 'loss' | 'correction';

// ─── INTERFEJSY ───────────────────────────────────

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  created_at: string;
  updated_at?: string;
}

export interface Location {
  id: string;
  tenant_id: string;
  name: string;
  address?: string;
  created_at: string;
}

export interface UserRoleRecord {
  id: string;
  user_id: string;
  tenant_id: string;
  role: UserRole;
  created_at: string;
}

export interface Ingredient {
  id: string;
  tenant_id: string;
  location_id?: string;
  name: string;
  category: IngredientCategory;
  unit: UnitType;
  current_stock: number;
  minimum_stock: number;
  created_at: string;
  updated_at?: string;
}

export interface IngredientPurchase {
  id: string;
  tenant_id: string;
  ingredient_id: string;
  supplier?: string;
  batch_number?: string;
  purchase_date: string;
  quantity: number;
  purchase_price_net: number;
  purchase_price_gross: number;
  created_at: string;
}

export interface IngredientTransaction {
  id: string;
  tenant_id: string;
  ingredient_id: string;
  transaction_type: TransactionType;
  quantity: number;
  batch_id?: string;
  created_by?: string;
  created_at: string;
}

export interface Recipe {
  id: string;
  tenant_id: string;
  name: string;
  description?: string;
  hydration_pct: number;
  salt_pct: number;
  yeast_pct: number;
  oil_pct: number;
  sugar_pct?: number;
  dough_temp?: number;
  room_temp?: number;
  fermentation_time_hours?: number;
  created_at: string;
  updated_at?: string;
}

export interface RecipeIngredient {
  id: string;
  recipe_id: string;
  ingredient_id: string;
  quantity_per_kg_flour: number;
  created_at: string;
}

export interface Mixer {
  id: string;
  tenant_id: string;
  location_id?: string;
  name: string;
  manufacturer?: string;
  model?: string;
  bowl_capacity_kg: number;
  safe_utilization_pct: number;
  created_at: string;
}

export interface ProductionBatch {
  id: string;
  tenant_id: string;
  location_id?: string;
  recipe_id: string;
  operator_id: string;
  mixer_id?: string;
  planned_balls: number;
  ball_weight_g: number;
  planned_dough_kg: number;
  actual_balls?: number;
  actual_dough_kg?: number;
  status: BatchStatus;
  created_at: string;
  started_at?: string;
  completed_at?: string;
}

export interface BatchIngredient {
  id: string;
  batch_id: string;
  ingredient_id: string;
  planned_quantity: number;
  actual_quantity?: number;
  created_at: string;
}

export interface Loss {
  id: string;
  tenant_id: string;
  batch_id?: string;
  loss_type: LossType;
  quantity: number;
  unit: string;
  cost_value: number;
  reason?: string;
  created_by?: string;
  created_at: string;
}

export interface ProductionPlan {
  id: string;
  tenant_id: string;
  location_id?: string;
  date: string;
  planned_sales?: number;
  planned_balls?: number;
  planned_batches?: number;
  created_at: string;
}

export interface Alert {
  id: string;
  tenant_id: string;
  type: string;
  threshold?: number;
  current_value?: number;
  message?: string;
  triggered_at: string;
  acknowledged: boolean;
  acknowledged_by?: string;
}

export interface AuditLog {
  id: string;
  tenant_id: string;
  table_name: string;
  record_id: string;
  action: string;
  old_values?: Record<string, unknown>;
  new_values?: Record<string, unknown>;
  user_id?: string;
  timestamp: string;
}

// ─── TYPY ZŁOŻONE ─────────────────────────────────

export interface IngredientWithCost extends Ingredient {
  current_wac: number;
  stock_value: number;
}

export interface YieldAnalysis {
  yield_score: number;
  flour_efficiency: number;
  dough_efficiency: number;
  ball_efficiency: number;
  lost_balls: number;
  lost_cost: number;
}

export interface OperatorRanking {
  operator_name: string;
  avg_loss_pct: number;
  avg_yield_pct: number;
  batch_count: number;
  total_loss_cost: number;
}

export interface DashboardKPI {
  yield_score_today: number;
  yield_score_month: number;
  monthly_loss_cost: number;
  food_cost_percent: number;
  lost_profit_monthly: number;
  lost_profit_annual_potential: number;
  top_loss_sources: { name: string; cost: number }[];
  operator_ranking: OperatorRanking[];
  recent_alerts: Alert[];
}
"use client";

import { useState } from "react";
import { ClientForm } from "@/components/clients/ClientForm";
import { DeleteClientDialog } from "@/components/clients/DeleteClientDialog";
import { FeedbackMessage } from "@/components/shared/FeedbackMessage";
import type { Client } from "@/types/client";

type ClientListProps = {
  clients: Client[];
};

export function ClientList({ clients }: ClientListProps) {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [deletingClient, setDeletingClient] = useState<Client | null>(null);
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState<"success" | "error" | "info">("info");

  function operationSucceeded(message: string) {
    setFeedback(message);
    setFeedbackType("success");
    setShowCreateForm(false);
    setEditingClient(null);
    setDeletingClient(null);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-950">Clientes</h1>
          <p className="mt-2 text-slate-600">Gerencie apenas os clientes da sua conta.</p>
        </div>
        <button
          type="button"
          onClick={() => {
            setFeedback("");
            setShowCreateForm(true);
          }}
          className="rounded-xl bg-sky-700 px-5 py-3 font-bold text-white shadow-sm hover:bg-sky-800"
        >
          Novo cliente
        </button>
      </div>

      <FeedbackMessage message={feedback} type={feedbackType} />

      {showCreateForm ? (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="mb-5 text-xl font-bold text-slate-950">Cadastrar cliente</h2>
          <ClientForm
            onCancel={() => setShowCreateForm(false)}
            onSuccess={() => operationSucceeded("Cliente cadastrado com sucesso.")}
          />
        </section>
      ) : null}

      {editingClient ? (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="mb-5 text-xl font-bold text-slate-950">Editar cliente</h2>
          <ClientForm
            client={editingClient}
            onCancel={() => setEditingClient(null)}
            onSuccess={() => operationSucceeded("Cliente atualizado com sucesso.")}
          />
        </section>
      ) : null}

      {clients.length === 0 ? (
        <section className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
          <h2 className="text-lg font-bold text-slate-900">Nenhum cliente cadastrado</h2>
          <p className="mt-2 text-sm text-slate-600">
            Clique em “Novo cliente” para adicionar o primeiro registro.
          </p>
        </section>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] border-collapse text-left">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-3 font-bold">Nome</th>
                  <th className="px-5 py-3 font-bold">E-mail</th>
                  <th className="px-5 py-3 font-bold">Telefone</th>
                  <th className="px-5 py-3 text-right font-bold">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {clients.map((client) => (
                  <tr key={client.id} className="text-sm text-slate-700">
                    <td className="px-5 py-4 font-semibold text-slate-950">{client.full_name}</td>
                    <td className="px-5 py-4">{client.email || "—"}</td>
                    <td className="px-5 py-4">{client.phone || "—"}</td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setFeedback("");
                            setEditingClient(client);
                          }}
                          className="rounded-lg border border-slate-300 px-3 py-2 font-bold text-slate-700 hover:bg-slate-50"
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setFeedback("");
                            setDeletingClient(client);
                          }}
                          className="rounded-lg border border-red-200 px-3 py-2 font-bold text-red-700 hover:bg-red-50"
                        >
                          Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {deletingClient ? (
        <DeleteClientDialog
          client={deletingClient}
          onClose={() => setDeletingClient(null)}
          onDeleted={() => operationSucceeded("Cliente excluído com sucesso.")}
        />
      ) : null}
    </div>
  );
}
